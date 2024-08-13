import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatabaseManagerService } from '../services/database-manager.service';
import { NgEventBus } from 'ng-event-bus';
import { IEventDataUserSelectTableOrColumn } from '../utils/events.interfaces';

class DynamicFlatNode {
  constructor(
    public label: string,
    public parent: string | null
  ) { }
}

export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  private dataSubject = new BehaviorSubject<DynamicFlatNode[]>([]);

  constructor(
    private treeControl: FlatTreeControl<DynamicFlatNode>,
    private database: DatabaseManagerService) {

    this.database
      .getTablesList()
      .subscribe({
        next: (values: string[]) => {
          this.dataSubject.next(values.map((tableName: string) => (new DynamicFlatNode(tableName, null))));
        },
      });

    this.treeControl.expansionModel.changed
      .subscribe((change: SelectionChange<DynamicFlatNode>) => {
        let result = this.dataSubject.value;

        result = result.filter(node => node.parent === null || !change.removed.find(p => p.label === node.parent));
        this.dataSubject.next(result);

        if (change.added.length > 0) {
          change.added.forEach(extendedNode => {

            this.database.getTableFields(extendedNode.label)
              .subscribe(tableFields => {
                const result = this.dataSubject.value;

                result.splice(
                  result.findIndex(p => p.label === extendedNode.label) + 1,
                  0,
                  ...tableFields.map((fieldName: string) => (new DynamicFlatNode(fieldName, extendedNode.label))),
                )

                this.dataSubject.next(result);
              });
          });
        }
      });
  }

  public connect(_collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    return this.dataSubject;
  }

  public disconnect(_collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
  }
}

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {
  @Output()
  public userSelect = new EventEmitter<string>();

  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;

  constructor(
    database: DatabaseManagerService,
    private eventBus: NgEventBus
  ) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(node => node.parent === null ? 0 : 1, node => !node.parent);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
  }

  public hasChild = (_: number, node: DynamicFlatNode) => !node.parent;

  public userSelectTable(node: DynamicFlatNode): void {
    this.eventBus.cast('user:select:tablename', {
      table: node.label,
    } as IEventDataUserSelectTableOrColumn);
  }

  public userSelectTableColumn(node: DynamicFlatNode): void {
    this.eventBus.cast('user:select:columnname', {
      table: node.parent,
      column: node.label,
    } as IEventDataUserSelectTableOrColumn);
  }
}