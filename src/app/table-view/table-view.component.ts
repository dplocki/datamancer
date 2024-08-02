import { Component, Input, OnInit } from '@angular/core';
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
export class TableViewComponent implements OnInit {

  @Input()
  public table!: string;

  displayedColumns!: string[];
  dataSource!: any[];

  constructor(private databaseManager: DatabaseManagerService) {
  }

  public ngOnInit(): void {
    const data = this.databaseManager.getTableData(this.table);
    this.displayedColumns = Object.keys(data[0]);
    this.dataSource = data;
  }

}
