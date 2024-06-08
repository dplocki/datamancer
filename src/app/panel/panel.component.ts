import { Component } from '@angular/core';
import { TableViewComponent } from '../table-view/table-view.component';
import { QueryComponent } from '../query/query.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    QueryComponent,
    TableViewComponent,
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  public inputText: string = '';

  public onInputChange(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.inputText = inputElement.value;
  }

  public onLoad(): void {
    console.log(this.inputText);
  }
}
