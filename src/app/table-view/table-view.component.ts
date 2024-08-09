import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DatabaseManagerService } from '../services/database-manager.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
  ],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss'
})
export class TableViewComponent implements OnChanges {

  @Input()
  public query!: string;

  displayedColumns!: string[];
  dataSource!: any[];

  constructor(private databaseManager: DatabaseManagerService) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['query']) {
      const data = this.databaseManager.runQuery(changes['query'].currentValue);
      this.displayedColumns = Object.keys(data[0]);
      this.dataSource = data;
    }
  }
}
