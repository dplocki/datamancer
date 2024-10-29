import { Injectable } from '@angular/core';
import alasql from 'alasql';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { DataType } from '../utils/data.type';

@Injectable({
  providedIn: 'root',
})
export class DatabaseManagerService {
  private db: BehaviorSubject<Record<string, string[]>> = new BehaviorSubject<
    Record<string, string[]>
  >({});

  constructor() {
    fetch('./assets/movies.database.json')
      .then((result) => result.json())
      .then((result) => {
        this.setTable(result.movies, 'movies');
      });

    fetch('./assets/users.tables.json')
      .then((result) => result.json())
      .then((result) => {
        this.setTable(result, 'users');
      });
  }

  public setTable(data: DataType[], tableName: string): void {
    alasql(`CREATE TABLE ${tableName}; SELECT * INTO ${tableName} FROM ?`, [
      data,
    ]);

    const tableState = Object.keys(alasql.tables).reduce(
      (result: Record<string, string[]>, tableName: string) => {
        result[tableName] = Object.keys(alasql.tables[tableName].data[0]);
        return result;
      },
      {},
    );

    this.db.next(tableState);
  }

  public getTablesList(): Observable<string[]> {
    return this.db.pipe(map((database) => Object.keys(database)));
  }

  public getTableFields(tableName: string): Observable<string[]> {
    return this.db.pipe(map((database) => database[tableName]));
  }

  public getTableData(tableName: string): DataType[] {
    return alasql.tables[tableName].data;
  }

  public runQuery(sqlQuery: string): DataType[] {
    return alasql(sqlQuery);
  }
}
