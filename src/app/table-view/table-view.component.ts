import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DataType } from '../utils/data.type';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [MatPaginatorModule, MatSortModule, MatTableModule],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss',
})
export class TableViewComponent implements OnChanges, AfterViewInit {
  @Input()
  public data: DataType[] | null = null;

  public displayedColumns!: string[];
  public dataSource: MatTableDataSource<DataType> =
    new MatTableDataSource<DataType>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;
  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  public isTableEmpty(): boolean {
    return this.dataSource.data.length === 0;
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data']) {
      return;
    }

    const data = changes['data'].currentValue;
    if (!data) {
      this.dataSource.data = [];
      this.displayedColumns = [];
      return;
    }

    this.displayedColumns = data.length > 0 ? Object.keys(data[0]) : [];
    this.dataSource.data = data;

    if (this.dataSource.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
