import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { TableViewComponent } from '../table-view/table-view.component';

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

      this.data = this.state.parse(this.rawText);
      this.state = new ImportPanelComponentStateDisplayData();
      this.stateLabel = 'TAB';

    } catch (error) {
      this.parsingError = (error as Error).message;
    }
  }

  public onValChange(value: any) {
    switch (value) {
      case 'JSON':
        this.state = new ImportPanelComponentStateParseJSON();
        break;
      case 'CSV':
        this.state = new ImportPanelComponentStateParseCSV();
        break;
      case 'SQL':
        this.state = new ImportPanelComponentStateParseSQL();
        break;
    }
  }
}

interface IImportPanelComponentState {
  get allowParse(): boolean;

  parse(text: string): any[];
}

class ImportPanelComponentStateBeforeParse {
  public get allowParse(): boolean {
    return true;
  }

}

class ImportPanelComponentStateParseJSON extends ImportPanelComponentStateBeforeParse implements IImportPanelComponentState {

  public parse(text: string): any[] {
    return JSON.parse(text);
  }
}

class ImportPanelComponentStateParseCSV extends ImportPanelComponentStateBeforeParse implements IImportPanelComponentState {

  public parse(text: string): any[] {
    throw new Error('not implemented');
  }
}

class ImportPanelComponentStateParseSQL extends ImportPanelComponentStateBeforeParse implements IImportPanelComponentState {

  public parse(text: string): any[] {
    throw new Error('not implemented');
  }
}

class ImportPanelComponentStateDisplayData implements IImportPanelComponentState {

  public get allowParse(): boolean {
    return false
  }

  parse(_text: string): any[] {
    throw new Error('Method cannot be called.');
  }
}