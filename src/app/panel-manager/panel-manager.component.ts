import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PanelComponent } from '../panel/panel.component';
import { DatabaseManagerService } from '../services/database-manager.service';

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
    private databaseManagerService: DatabaseManagerService) {
  }

  ngOnInit(): void {
    this.databaseManagerService.getTablesList()
      .subscribe({
        next: (values: string[]) => {
          this.tabs = values.map((tableName) => tableName)
        }
      });
  }

}
