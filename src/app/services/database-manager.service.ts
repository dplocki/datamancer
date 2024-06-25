import { Injectable } from '@angular/core';
import alasql from 'alasql';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {

  private db: BehaviorSubject<{ [key: string]: string[] }> = new BehaviorSubject<{ [key: string]: string[] }>({});

  constructor() {
    fetch('./assets/example.database.json')
      .then(result => result.json())
      .then(result => {

        alasql('CREATE TABLE movies (Name STRING, Year int, `Age Rating` STRING, Duration STRING, Category STRING, `IMDb Rating` int)');
        alasql.tables['movies'].data = result.movies;
        console.log(alasql('SELECT * FROM movies'));
      });
  }

  public getTablesList(): Observable<string[]> {
    return this.db.pipe(map(database => Object.keys(database)));
  }

  public getTableFields(tableName: string): Observable<string[]> {
    return this.db.pipe(map(database => Object.keys(database[tableName])));
  }

}
