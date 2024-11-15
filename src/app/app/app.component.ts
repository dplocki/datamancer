import { Component, ViewChild } from '@angular/core';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { PanelManagerComponent } from '../panel-manager/panel-manager.component';
import { HeaderComponent } from '../header/header.component';
import { NgEventBus } from 'ng-event-bus';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-header />
    <mat-drawer-container>
      <mat-drawer #drawer mode="side" position="end">
        <app-side-panel />
      </mat-drawer>
      <mat-drawer-content>
        <section>
          <app-panel-manager />
        </section>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrls: ['app.component.scss'],
  imports: [
    MatSidenavModule,
    SidePanelComponent,
    PanelManagerComponent,
    HeaderComponent,
  ],
})
export class AppComponent {
  public title = 'Datamancer';

  @ViewChild('drawer') drawer!: MatDrawer;

  public constructor(private eventBus: NgEventBus) {
    this.eventBus.on('user:tablelist:toggle').subscribe({
      next: () => this.drawer.toggle(),
    });
  }
}
