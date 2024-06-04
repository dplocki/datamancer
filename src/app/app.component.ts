import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from './footer/footer.component';
import { SidePanelComponent } from "./side-panel/side-panel.component";
import { PanelManagerComponent } from './panel-manager/panel-manager.component';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
    <app-header />
    <main>
      <app-panel-manager />
      <aside>
        <app-side-panel />
      </aside>
    </main>
    <app-footer />
  `,
    styleUrls: ['app.component.scss'],
    imports: [
        HeaderComponent,
        FooterComponent,
        SidePanelComponent,
        PanelManagerComponent
    ]
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
