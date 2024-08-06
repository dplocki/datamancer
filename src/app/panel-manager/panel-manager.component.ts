import { Component, OnInit } from '@angular/core';
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
export class PanelManagerComponent implements OnInit {

  public tabs!: string[];

  constructor() {
  }

  ngOnInit(): void {
    this.tabs = [];
  }

}
