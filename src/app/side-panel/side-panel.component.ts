import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { TablesTreeComponent } from '../tables-tree/tables-tree.component';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [MatButtonModule, MatProgressBarModule, TablesTreeComponent],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss',
})
export class SidePanelComponent {
}
