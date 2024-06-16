import { Injectable } from '@angular/core';
import { databases } from 'alasql';
import { BehaviorSubject, Observable, delay, map, merge, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {

  // private database:  = {};
  private db: BehaviorSubject<{ [key: string]: string[] }> = new BehaviorSubject<{ [key: string]: string[] }>({});

  constructor() {
    fetch('./assets/example.database.json')
      .then(result => result.json())
      .then(result => {
        this.db.next(result);
      });
  }

  public getTablesList(): Observable<string[]> {
    return this.db.pipe(map(database => Object.keys(database)));
  }

  public getTableFields(tableName: string): Observable<string[]> {
    return this.db.pipe(map(database => Object.keys(database[tableName])));
  }

}
