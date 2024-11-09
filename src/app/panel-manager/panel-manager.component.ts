import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MetaData, NgEventBus } from 'ng-event-bus';
import { IEventDataUserSelectTableOrColumn } from '../utils/events.interfaces';
import { MatIconModule } from '@angular/material/icon';
import { ImportTab, QueryTab, Tab } from '../utils/tab';
import { QueryPanelComponent } from '../query-panel/query-panel.component';
import { ImportPanelComponent } from '../import-panel/import-panel.component';
import { TabType } from '../utils/tabs.type';

@Component({
  selector: 'app-panel-manager',
  standalone: true,
  imports: [
    ImportPanelComponent,
    MatIconModule,
    MatTabsModule,
    QueryPanelComponent,
  ],
  templateUrl: './panel-manager.component.html',
  styleUrl: './panel-manager.component.scss',
})
export class PanelManagerComponent implements OnInit {
  public tabs!: Tab[];

  private tabNumber = 1;

  public TabType = TabType;

  public constructor(private eventBus: NgEventBus) {
    this.eventBus.on('user:select:tablename').subscribe({
      next: (event: MetaData<unknown>) =>
        this.onUserSelectTableName(
          event as MetaData<IEventDataUserSelectTableOrColumn>,
        ),
    });

    this.eventBus.on('user:create:newquerytab').subscribe({
      next: (): void => {
        this.tabs.push(new QueryTab(this.buildTabName(), ''));
      },
    });
  }

  public ngOnInit(): void {
    this.tabs = [
      new ImportTab('an example import tab'),
      new QueryTab(this.buildTabName(), ''),
    ];
  }

  public closeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  public onCloseTab(index: number, event: Event): void {
    this.closeTab(index);
    event.stopPropagation();
  }

  private onUserSelectTableName(
    event: MetaData<IEventDataUserSelectTableOrColumn>,
  ): void {
    const eventData = event.data;
    this.tabs.push(
      new QueryTab(eventData!.table, `SELECT * FROM \`${eventData!.table}\`;`),
    );
  }

  private buildTabName() {
    return `tab ${this.tabNumber++}`;
  }
}
