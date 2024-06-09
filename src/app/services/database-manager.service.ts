import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseManagerService {

  private database: { [key: string]: string[] } = {
    abcdef: [
      'Afield',
      'Bfield',
      'Cfield',
      'Dfield',
    ],
    bcdefg: [
      'Afield',
      'Bfield',
      'Cfield',
    ]
  }

  constructor() { }

  public getTablesList(): Observable<string[]> {
    return of(Object.keys(this.database));
  }

  public getTableFields(tableName: string): string[] {
    return this.database[tableName];
  }

}
