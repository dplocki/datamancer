import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { sql } from '@codemirror/lang-sql';
import { basicSetup, EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';

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
  styleUrl: './query.component.scss',
})
export class QueryComponent implements AfterViewInit {
  @Input()
  public query: string | undefined = '';

  @Output()
  public executeQuery = new EventEmitter<string>();

  @ViewChild('queryEditor')
  public queryEditor: any;

  private editor!: EditorView;

  public runQuery(_event: MouseEvent) {
    this.executeQuery.emit(this.editor.state.doc.toString());
  }

  public ngAfterViewInit(): void {
    const editorElement = this.queryEditor.nativeElement;
    const state = EditorState.create({
      doc: this.query,
      extensions: [basicSetup, sql()],
    });

    this.editor = new EditorView({
      state,
      parent: editorElement,
    });
  }
}
