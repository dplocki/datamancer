import { Injectable } from '@angular/core';
import alasql from 'alasql';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {

  private db: BehaviorSubject<{ [key: string]: string[] }> = new BehaviorSubject<{ [key: string]: string[] }>({});

  constructor() {
    fetch('./assets/movies.database.json')
      .then(result => result.json())
      .then(result => {
        this.setTable(result.movies, 'movies');
      });

    fetch('./assets/users.tables.json')
      .then(result => result.json())
      .then(result => {
        this.setTable(result, 'users');
      });
  }

  public setTable(data: unknown[], tableName: string): void {
    alasql(`CREATE TABLE ${tableName}; SELECT * INTO ${tableName} FROM ?`, [data]);

    const tableState = Object.keys(alasql.tables).reduce((result: { [key: string]: string[] }, tableName: string) => {
      result[tableName] = Object.keys(alasql.tables[tableName].data[0]);
      return result
    }, {});

    this.db.next(tableState);
  }

  public getTablesList(): Observable<string[]> {
    return this.db.pipe(map(database => Object.keys(database)));
  }

  public getTableFields(tableName: string): Observable<string[]> {
    return this.db.pipe(map(database => database[tableName]));
  }

  public getTableData(tableName: string): any[] {
    return alasql.tables[tableName].data;
  }

  public runQuery(sqlQuery: string): any[] {
    return alasql(sqlQuery);
  }

}
