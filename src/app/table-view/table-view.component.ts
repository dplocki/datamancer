import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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
export class TableViewComponent implements OnChanges, AfterViewInit {

  @Input()
  public query!: string;

  public error: string | null = null;

  displayedColumns!: string[];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  constructor(private databaseManager: DatabaseManagerService) {
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['query']) {
      return;
    }

    try {
      const query = changes['query'].currentValue;
      if (query === '') {
        this.error = null;
        this.dataSource.data = [];
        this.displayedColumns = [];
        return;
      }

      const data = this.databaseManager.runQuery(query);
      if (!data) {
        this.dataSource.data = [];
        this.error = null;
        return;
      }

      this.displayedColumns = data.length > 0 ? Object.keys(data[0]) : [];
      this.dataSource.data = data;
      this.error = null;
    } catch (error) {
      this.error = (error as Error).message;
      console.log(error);
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
