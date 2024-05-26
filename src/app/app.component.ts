import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from './footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <app-header />
    <main>
      <section>
        <form>
          <textarea (input)="onInputChange($event)"></textarea>
          <button class="primary" type="button" (click)="onLoad()">Load</button>
        </form>
      </section>
      <aside>
      </aside>
    </main>
    <app-footer />
  `,
    styleUrls: ['app.component.scss'],
    imports: [
      HeaderComponent,
      FooterComponent
    ],
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
