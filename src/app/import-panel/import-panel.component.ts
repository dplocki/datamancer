import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { TableViewComponent } from '../table-view/table-view.component';
import { stringify } from 'csv-stringify/browser/esm/sync';
import { DataFileFormat } from '../utils/data.file.format';
import { DataType } from '../utils/data.type';
import { DataFilesParserService } from '../services/data-files-paser.service';
import { ErrorDisplayComponent } from "../error-display/error-display.component";

const PARSING_STATE = {
  Allow: true,
  Disable: false,
};

@Component({
  selector: 'app-import-panel',
  standalone: true,
  imports: [
    ErrorDisplayComponent,
    FormsModule,
    TableViewComponent,
    MatButtonModule,
    MatButtonToggleModule,
    ErrorDisplayComponent
],
  templateUrl: './import-panel.component.html',
  styleUrl: './import-panel.component.scss',
})
export class ImportPanelComponent {
  public stateLabel = DataFileFormat.JSON;
  public rawText = '';
  public parsingError: string | null = null;
  public data: DataType[] | null = null;

  private state: IImportPanelComponentState =
    new ImportPanelComponentStateParseJSON();

  constructor(private dataFilesParserService: DataFilesParserService) {}

  public get isBeforeParsing(): boolean {
    return !this.state.allowParse;
  }

  public parseData(): void {
    this.parsingError = null;
    this.data = null;

    try {
      this.data = this.state.textToData(this.rawText);
      this.state = new ImportPanelComponentStateDisplayData();
      this.stateLabel = DataFileFormat.Table;
    } catch (error) {
      this.parsingError = (error as Error).message;
      this.data = null;
    }
  }

  public onDataFormatChange(value: string): void {
    this.parsingError = null;

    switch (value) {
      case DataFileFormat.JSON:
        this.state = new ImportPanelComponentStateParseJSON();
        break;
      case DataFileFormat.CSV:
        this.state = new ImportPanelComponentStateParseCSV(
          this.dataFilesParserService,
        );
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
    return PARSING_STATE.Allow;
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
  constructor(private dataFilesParserService: DataFilesParserService) {
    super();
  }

  public textToData(text: string): DataType[] {
    return this.dataFilesParserService.parseCSV(text);
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
    return PARSING_STATE.Disable;
  }

  public textToData(): DataType[] {
    throw new Error('Method cannot be called.');
  }

  public dataToText(): string {
    throw new Error('Method cannot be called.');
  }
}
