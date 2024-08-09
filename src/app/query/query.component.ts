import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  public query: string|undefined = '';

  @Output()
  public executeQuery = new EventEmitter<string>();

  constructor() {
  }

  public runQuery(_event: MouseEvent) {
    this.executeQuery.emit(this.query);
  }
}
