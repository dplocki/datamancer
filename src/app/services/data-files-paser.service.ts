import { Injectable } from '@angular/core';
import { parse } from 'csv-parse/browser/esm/sync';
import { DataType } from '../utils/data.type';

@Injectable({
  providedIn: 'root',
})
export class DataFilesParserService {
  public parseCSV(content: string): DataType[] {
    const data: unknown[][] = parse(content);
    if (!Array.isArray(data) || data.length === 0) {
      return data as [];
    }

    const columns = data.shift() as string[];

    return data.map((datum: unknown[]): DataType => {
      return columns.reduce(
        (result: DataType, currentColumn: string, index: number) => {
          const rawData = datum[index];

          result[currentColumn] = isNaN(rawData as number)
            ? rawData
            : +(rawData as number);
          return result;
        },
        {},
      );
    });
  }
}
