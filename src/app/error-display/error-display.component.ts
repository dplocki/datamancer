import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [],
  templateUrl: './error-display.component.html',
  styleUrl: './error-display.component.scss',
})
export class ErrorDisplayComponent {
  @Input()
  public message?: string | null;
}
