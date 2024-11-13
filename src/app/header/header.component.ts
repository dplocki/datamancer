import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgEventBus } from 'ng-event-bus';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private eventBus: NgEventBus) {}

  public runNewQuery(): void {
    this.eventBus.cast('user:create:newquerytab');
  }

  public toggleTableListPanel(): void {
    this.eventBus.cast('user:tablelist:toggle');
  }
}
