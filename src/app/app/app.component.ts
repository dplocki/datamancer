import { Component } from '@angular/core';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PanelManagerComponent } from '../panel-manager/panel-manager.component';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-header />
    <mat-drawer-container>
      <mat-drawer #drawer mode="side">
        <app-side-panel />
      </mat-drawer>
      <mat-drawer-content>
        <section>
          <button mat-raised-button (click)="drawer.toggle()">Toggle drawer</button>
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
    HeaderComponent
],
})
export class AppComponent {
  title = 'Datamancer';
}
