import { Component, Input } from '@angular/core';
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
  @Input()
  public query!: string;

  public executeQuery(query: string): void {
    this.query = query;
  }
}
