import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './query.component.html',
  styleUrl: './query.component.scss'
})
export class QueryComponent {

}
