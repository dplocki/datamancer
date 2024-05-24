import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <section>
      <form>
        <textarea (input)="onInputChange($event)"></textarea>
        <button class="primary" type="button" (click)="onLoad()">Load</button>
      </form>
    </section>
  `,
})
export class AppComponent {
  public inputText: string = '';

  title = 'Datamancer';

  public onLoad(): void {
    console.log(this.inputText);
  }

  public onInputChange(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.inputText = inputElement.value;
  }
}
