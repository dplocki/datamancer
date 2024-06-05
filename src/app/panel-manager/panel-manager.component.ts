import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PanelComponent } from '../panel/panel.component';

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
export class PanelManagerComponent {
  lotsOfTabs = new Array(30).fill(0).map((_, index) => `Tab ${index}`);
}
