import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgEventBus } from 'ng-event-bus';
import { ImportDialogComponent } from '../import-dialog/import-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private dialog: MatDialog,
    private eventBus: NgEventBus,
  ) {}

  public runNewQuery(): void {
    this.eventBus.cast('user:create:new-query-tab');
  }

  public toggleTableListPanel(): void {
    this.eventBus.cast('user:table-list:toggle');
  }

  public showImportDialog(): void {
    this.dialog.open(ImportDialogComponent, {
      width: '80%',
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
    });
  }

  public addNewParseTab(): void {
    this.eventBus.cast('user:create:new-parsing-tab');
  }
}
