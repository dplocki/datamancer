import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { sql } from '@codemirror/lang-sql';
import { basicSetup, EditorView } from 'codemirror';
import { EditorState, Extension } from '@codemirror/state';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './query.component.html',
  styleUrl: './query.component.scss'
})
export class QueryComponent  implements AfterViewInit {
  @Input()
  public query: string|undefined = '';

  @Output()
  public executeQuery = new EventEmitter<string>();

  @ViewChild('queryEditor')
  public queryEditor: any;

  constructor() {
  }

  public runQuery(_event: MouseEvent) {
    this.executeQuery.emit(this.query);
  }

  ngAfterViewInit(): void {
    const editorElement = this.queryEditor.nativeElement;
    let myExt: Extension = [basicSetup, sql()];
    let state!: EditorState;

    try {
      state = EditorState.create({
        doc: this.query,
        extensions: myExt,
      });
    } catch (e) {
      console.error('query-component', e);
    }

    new EditorView({
      state,
      parent: editorElement,
    });
  }
}
