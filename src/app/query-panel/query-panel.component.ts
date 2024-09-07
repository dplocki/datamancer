import { Component, Input, OnInit } from '@angular/core';
import { TableViewComponent } from '../table-view/table-view.component';
import { QueryComponent } from '../query/query.component';
import { DatabaseManagerService } from '../services/database-manager.service';

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
export class QueryPanelComponent implements OnInit {
  @Input()
  public query: string = '';
  public data: any[] = [];

  constructor(
    private databaseManager: DatabaseManagerService) {
  }

  public ngOnInit(): void {
    if (!this.query) {
      return;
    }

    this.executeQuery(this.query);
  }

  public executeQuery(query: string): void {
    this.query = query;
    this.data = this.databaseManager.runQuery(query);
  }
}
