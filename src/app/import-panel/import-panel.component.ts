import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { TableViewComponent } from '../table-view/table-view.component';
import { stringify } from 'csv-stringify/browser/esm/sync';
import { parse } from 'csv-parse/browser/esm/sync';

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
  styleUrl: './import-panel.component.scss'
})
export class ImportPanelComponent {

  public stateLabel: string = 'JSON';
  public rawText: string = '';
  public parsingError: string | null = null;
  public data: any[] | null = null;

  private state: IImportPanelComponentState = new ImportPanelComponentStateParseJSON();

  public get isBeforeParsing() {
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

  public onDataFormatChange(value: any) {
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

  textToData(text: string): any[];

  dataToText(data: any[]): string;
}

abstract class ImportPanelComponentStateBeforeParse implements IImportPanelComponentState {

  public abstract textToData(text: string): any[];

  public abstract dataToText(data: any[]): string;

  public get allowParse(): boolean {
    return true;
  }

}

class ImportPanelComponentStateParseJSON extends ImportPanelComponentStateBeforeParse {

  public textToData(text: string): any[] {
    return JSON.parse(text);
  }

  public dataToText(data: any[]): string {
    return JSON.stringify(data, null, 4);
  }
}

class ImportPanelComponentStateParseCSV extends ImportPanelComponentStateBeforeParse {

  public textToData(text: string): any[] {
    const data: any[] = parse(text);
    if (!Array.isArray(data) || (data.length === 0)) {
      return data;
    }

    const columns: string[] = data.shift();

    return data.map(datum => {
      return columns.reduce((result: Record<string, any>, currentColumn: any, index: number) => {
        const rawData = datum[index];

        result[currentColumn] = isNaN(rawData) ? rawData : +rawData;
        return result;
      }, {});
    });
  }

  public dataToText(data: any[]): string {
    if (data.length === 0) {
      return '';
    }

    const csvArray = [
      (Object.keys(data[0]) as any[]),
      ...data.map(Object.values)
    ];

    return stringify(csvArray);
  }
}

class ImportPanelComponentStateDisplayData implements IImportPanelComponentState {

  public get allowParse(): boolean {
    return false
  }

  public textToData(_text: string): any[] {
    throw new Error('Method cannot be called.');
  }

  public dataToText(_data: any[]): string {
    throw new Error('Method cannot be called.');
  }
}
