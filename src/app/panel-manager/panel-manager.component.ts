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

  public tabStartingQueries!: string[];

  constructor(
    private eventBus: NgEventBus) {

    this.eventBus.on('user:select:tablename').subscribe({
      next: (event: MetaData<unknown>): void => {
        const eventData = (event as MetaData<IEventDataUserSelectTableOrColumn>).data;
        this.tabStartingQueries.push(`SELECT * FROM ${eventData!.table};`);
      },
    });
  }

  public ngOnInit(): void {
    this.tabStartingQueries = [''];
  }

  public closeTab(index: number) {
    this.tabStartingQueries.splice(index, 1);
  }

}
