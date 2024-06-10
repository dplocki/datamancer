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
    ],
    cdefgh: [
      'Afield',
      'Bfield',
      'Cfield',
      'Dfield',
      'Efield',
    ],
    defghi: [
      'Afield',
      'Bfield',
    ]
  }

  constructor() { }

  public getTablesList(): Observable<string[]> {
    return merge(
      of(Object.keys(this.database).splice(0, 2)),
      of(Object.keys(this.database).splice(1, 3)).pipe(delay(3000)),
      of(Object.keys(this.database).splice(2, 2)).pipe(delay(5000))
    );
  }

  public getTableFields(tableName: string): string[] {
    return this.database[tableName];
  }

}
