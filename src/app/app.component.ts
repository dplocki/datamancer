import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <h1>{{ title }}</h1>
  `,
})
export class AppComponent {
  title = 'Datamancer';
}
