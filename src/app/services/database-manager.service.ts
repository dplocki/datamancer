import { Injectable } from '@angular/core';
import { Observable, delay, map, merge, of } from 'rxjs';

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
    return merge(
      of(Object.keys(this.database)),
      of(['cdefgh', 'defghi']).pipe(delay(3000)),
    );
  }

  public getTableFields(tableName: string): string[] {
    return this.database[tableName];
  }

}
