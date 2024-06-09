import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatabaseManagerService } from '../services/database-manager.service';

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
        next: (values: string[]) => values.map((tableName: string) => (new DynamicFlatNode(tableName, null))),
      });

    this.treeControl.expansionModel.changed
      .subscribe((change: SelectionChange<DynamicFlatNode>) => {
        let result = this.dataSubject.value;

        result = result
          .filter(node => node.parent === null || !change.removed.find(p => p.label === node.parent))
          .flatMap(node => {
            if (change.added.find(p => p.label === node.label)) {
              return [node].concat(this.database.getTableFields(node.label)
                .map((fieldName: string) => (new DynamicFlatNode(fieldName, node.label))));
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
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(node => node.parent === null ? 0 : 1, node => !node.parent);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
  }

  hasChild = (_: number, node: DynamicFlatNode) => !node.parent;
}