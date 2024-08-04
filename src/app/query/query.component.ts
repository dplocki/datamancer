import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MetaData, NgEventBus } from 'ng-event-bus';
import { IEventDataUserSelectTableOrColumn } from '../utils/events.interfaces';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './query.component.html',
  styleUrl: './query.component.scss'
})
export class QueryComponent {
  @Input()
  public query: string = '';

  constructor(
    private eventBus: NgEventBus) {
    this.eventBus.on('user:select:columnname').subscribe({
      next: (event: MetaData<unknown>): void => {
        const data = event as MetaData<IEventDataUserSelectTableOrColumn>;
        console.log('event:', data);
      }
    });
  }

}
