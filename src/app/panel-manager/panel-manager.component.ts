import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PanelComponent } from '../panel/panel.component';
import { MetaData, NgEventBus } from 'ng-event-bus';
import { IEventDataUserSelectTableOrColumn } from '../utils/events.interfaces';

@Component({
  selector: 'app-panel-manager',
  standalone: true,
  imports: [
    MatTabsModule,
    PanelComponent
  ],
  templateUrl: './panel-manager.component.html',
  styleUrl: './panel-manager.component.scss',
})
export class PanelManagerComponent implements OnInit {

  public tabs!: string[];

  constructor(
    private eventBus: NgEventBus) {

    this.eventBus.on('user:select:tablename').subscribe({
      next: (event: MetaData<unknown>): void => {
        const eventData = (event as MetaData<IEventDataUserSelectTableOrColumn>).data;
        this.tabs.push(eventData!.table);
      },
    });
  }

  public ngOnInit(): void {
    this.tabs = ['tab 1'];
  }

  public closeTab(index: number) {
    console.log('Close tab', index);
  }

}
