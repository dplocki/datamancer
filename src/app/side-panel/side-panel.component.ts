import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { BehaviorSubject, Observable, filter, map, of, switchMap } from 'rxjs';
import { DatabaseManagerService } from '../services/database-manager.service';

export class DynamicFlatNode {
  constructor(
    public item: string,
    public parent: string | null,
    public isExpandable = false,
  ) { }
}

export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  private dataSubject = new BehaviorSubject<DynamicFlatNode[]>([]);

  constructor(
    private treeControl: FlatTreeControl<DynamicFlatNode>,
    private database: DatabaseManagerService) {

    this.dataSubject.next(this.database.getTablesList().map((tableName: string) => (new DynamicFlatNode(tableName, null, true))));
    this.treeControl.expansionModel.changed
      .subscribe((change: SelectionChange<DynamicFlatNode>) => {
        let result = this.dataSubject.value;

        result = result
          .filter(node => node.parent === null || !change.removed.find(p => p.item === node.parent))
          .flatMap(node => {
            if (change.added.find(p => p.item === node.item)) {
              return [node].concat(this.database.getTableFields(node.item)
                .map((fieldName: string) => (new DynamicFlatNode(fieldName, node.item, false))));
            }

            return node;
          });

        this.dataSubject.next(result);
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
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;

  constructor(database: DatabaseManagerService) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(node => node.parent === null ? 0 : 1, node => node.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
  }

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.isExpandable;
}
