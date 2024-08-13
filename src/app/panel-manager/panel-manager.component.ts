import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PanelComponent } from '../panel/panel.component';
import { MetaData, NgEventBus } from 'ng-event-bus';
import { IEventDataUserSelectTableOrColumn } from '../utils/events.interfaces';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-panel-manager',
  standalone: true,
  imports: [
    MatIconModule,
    MatTabsModule,
    PanelComponent,
  ],
  templateUrl: './panel-manager.component.html',
  styleUrl: './panel-manager.component.scss',
})
export class PanelManagerComponent implements OnInit {

  public tabs!: Tab[];

  private tabNumber: number = 1;

  constructor(
    private eventBus: NgEventBus) {

    this.eventBus.on('user:select:tablename').subscribe({
      next: (event: MetaData<unknown>) => this.onUserSelectTableName(event as MetaData<IEventDataUserSelectTableOrColumn>),
    });

    this.eventBus.on('user:create:newquerytab').subscribe({
      next: (): void => { this.tabs.push(new Tab(this.buildTabName(), '')); },
    });
  }

  public ngOnInit(): void {
    this.tabs = [new Tab(this.buildTabName(), '')];
  }

  public closeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  private onUserSelectTableName(event: MetaData<IEventDataUserSelectTableOrColumn>): void {
    const eventData = event.data;
    this.tabs.push(new Tab(this.buildTabName(), `SELECT * FROM ${eventData!.table};`));
  }

  private buildTabName() {
    return `tab ${this.tabNumber++}`;
  }
}

class Tab {
  public get tabName(): string {
    return this._tabName;
  }

  public get startingQuery(): string {
    return this._startingQuery;
  }

  constructor(private _tabName: string, private _startingQuery: string) {
  }
}