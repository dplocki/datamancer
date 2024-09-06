import { Component, Input } from '@angular/core';
import { TableViewComponent } from '../table-view/table-view.component';
import { QueryComponent } from '../query/query.component';

@Component({
  selector: 'app-query-panel',
  standalone: true,
  imports: [
    QueryComponent,
    TableViewComponent,
  ],
  templateUrl: './query-panel.component.html',
  styleUrl: './query-panel.component.scss'
})
export class QueryPanelComponent {
  @Input()
  public query!: string;

  public executeQuery(query: string): void {
    this.query = query;
  }
}
