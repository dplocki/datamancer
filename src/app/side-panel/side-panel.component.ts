import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { TablesTreeComponent } from '../tables-tree/tables-tree.component';
import { NgEventBus } from 'ng-event-bus';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [
    MatButtonModule,
    MatProgressBarModule,
    TablesTreeComponent,
],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss'
})
export class SidePanelComponent {

  constructor(private eventBus: NgEventBus) {
  }

  public onImportClick() {
    this.eventBus.cast('user:select:importdata')
  }
}