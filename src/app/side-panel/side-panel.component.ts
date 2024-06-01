import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Injectable } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { BehaviorSubject, Observable, map, merge, of } from 'rxjs';
import { DatabaseManagerService } from '../services/database-manager.service';

export class DynamicFlatNode {
  constructor(
    public item: string,
    public level = 1,
    public isExpandable = false,
  ) { }
}

export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  private dataSubject = new BehaviorSubject<DynamicFlatNode[]>([]);

  constructor(private database: DatabaseManagerService) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    collectionViewer.viewChange.subscribe(p => console.log('a', p));

    return of(this.database.getTablesList().map((s: string) => (new DynamicFlatNode(s, 0, true))));
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
  }

  loadInitialData(initialData: DynamicFlatNode[]) {
    this.dataSubject.next(initialData);
  }

  loadChildren(node: DynamicFlatNode) {
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
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(node => node.level, node => node.isExpandable);
    this.dataSource = new DynamicDataSource(database);

    this.treeControl.expansionModel.changed.subscribe(change => {
      console.log('change', change);
    });
  }

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.isExpandable;
}
