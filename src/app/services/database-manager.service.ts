import { Injectable } from '@angular/core';
import alasql from 'alasql';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {

  private db: BehaviorSubject<{ [key: string]: string[] }> = new BehaviorSubject<{ [key: string]: string[] }>({});

  constructor() {
    fetch('./assets/example.database.json')
      .then(result => result.json())
      .then(result => {
        this.setTable(result.movies);
      });
  }

  public setTable(data: unknown[]) {
    alasql('CREATE TABLE movies (Name STRING, Year int, `Age Rating` STRING, Duration STRING, Category STRING, `IMDb Rating` int)');
    alasql.tables['movies'].data = data;

    this.db.next({
      movies: ['Name', 'Year', 'Age Rating', 'Duration', 'Category', 'IMDb Rating' ]
    });
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

}
