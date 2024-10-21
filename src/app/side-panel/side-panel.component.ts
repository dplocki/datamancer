import { Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { TablesTreeComponent } from '../tables-tree/tables-tree.component';
import { MatDialog } from '@angular/material/dialog';
import { ImportDialogComponent } from '../import-dialog/import-dialog.component';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [MatButtonModule, MatProgressBarModule, TablesTreeComponent],
  templateUrl: './side-panel.component.html',
  styleUrl: './side-panel.component.scss',
})
export class SidePanelComponent {
  readonly dialog = inject(MatDialog);

  public onImportClick() {
    this.dialog.open(ImportDialogComponent, {
      width: '250px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });
  }
}
