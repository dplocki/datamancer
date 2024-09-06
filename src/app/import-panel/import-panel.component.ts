import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-import-panel',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  templateUrl: './import-panel.component.html',
  styleUrl: './import-panel.component.scss'
})
export class ImportPanelComponent {

  public fontStyle: string = 'JSON';
  public rawText: string = '';

  public parseData(): void {
    const data = JSON.parse(this.rawText);

    console.log(data);
  }
}
