import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgEventBus } from 'ng-event-bus';
import { ImportDialogComponent } from '../import-dialog/import-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private dialog: MatDialog,
    private eventBus: NgEventBus,
  ) {}

  public runNewQuery(): void {
    this.eventBus.cast('user:create:newquerytab');
  }

  public toggleTableListPanel(): void {
    this.eventBus.cast('user:tablelist:toggle');
  }

  public showImportDialog(): void {
    this.dialog.open(ImportDialogComponent, {
      width: '80%',
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  public adddNewParseTab(): void {
    this.eventBus.cast('user:create:newparsingtab');
  }
}
