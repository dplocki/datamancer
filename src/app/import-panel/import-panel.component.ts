import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { TableViewComponent } from '../table-view/table-view.component';
import { stringify } from 'csv-stringify/browser/esm/sync';
import { parse } from 'csv-parse/browser/esm/sync';

type DataType = Record<string, unknown>;

@Component({
  selector: 'app-import-panel',
  standalone: true,
  imports: [
    FormsModule,
    TableViewComponent,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  templateUrl: './import-panel.component.html',
  styleUrl: './import-panel.component.scss',
})
export class ImportPanelComponent {
  public stateLabel = 'JSON';
  public rawText = '';
  public parsingError: string | null = null;
  public data: DataType[] | null = null;

  private state: IImportPanelComponentState =
    new ImportPanelComponentStateParseJSON();

  public get isBeforeParsing(): boolean {
    return !this.state.allowParse;
  }

  public parseData(): void {
    this.parsingError = null;
    this.data = null;

    try {
      this.data = this.state.textToData(this.rawText);
      this.state = new ImportPanelComponentStateDisplayData();
      this.stateLabel = 'TAB';
    } catch (error) {
      this.parsingError = (error as Error).message;
      this.data = null;
    }
  }

  public onDataFormatChange(value: string): void {
    this.parsingError = null;

    switch (value) {
      case 'JSON':
        this.state = new ImportPanelComponentStateParseJSON();
        break;
      case 'CSV':
        this.state = new ImportPanelComponentStateParseCSV();
        break;
    }

    if (this.data) {
      this.rawText = this.state.dataToText(this.data);
    }
  }
}

interface IImportPanelComponentState {
  get allowParse(): boolean;

  textToData(text: string): DataType[];

  dataToText(data: DataType[]): string;
}

abstract class ImportPanelComponentStateBeforeParse
  implements IImportPanelComponentState
{
  public abstract textToData(text: string): DataType[];

  public abstract dataToText(data: DataType[]): string;

  public get allowParse(): boolean {
    return true;
  }
}

class ImportPanelComponentStateParseJSON extends ImportPanelComponentStateBeforeParse {
  public textToData(text: string): DataType[] {
    return JSON.parse(text);
  }

  public dataToText(data: DataType[]): string {
    return JSON.stringify(data, null, 4);
  }
}

class ImportPanelComponentStateParseCSV extends ImportPanelComponentStateBeforeParse {
  public textToData(text: string): DataType[] {
    const data: unknown[][] = parse(text);
    if (!Array.isArray(data) || data.length === 0) {
      return data as [];
    }

    const columns = data.shift() as string[];

    return data.map((datum) => {
      return columns.reduce(
        (result: DataType, currentColumn: string, index: number) => {
          const rawData = datum[index];

          result[currentColumn] = isNaN(rawData as number) ? rawData : +(rawData as number);
          return result;
        },
        {},
      );
    });
  }

  public dataToText(data: DataType[]): string {
    if (data.length === 0) {
      return '';
    }

    const csvArray = [
      Object.keys(data[0]) as string[],
      ...data.map(Object.values),
    ];

    return stringify(csvArray);
  }
}

class ImportPanelComponentStateDisplayData
  implements IImportPanelComponentState
{
  public get allowParse(): boolean {
    return false;
  }

  public textToData(): DataType[] {
    throw new Error('Method cannot be called.');
  }

  public dataToText(): string {
    throw new Error('Method cannot be called.');
  }
}
