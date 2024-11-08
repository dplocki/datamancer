import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataFilesParserService } from '../services/data-files-paser.service';
import { DatabaseManagerService } from '../services/database-manager.service';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

interface IValidationMessages {
  tableName: string | null,
  dataType: string | null,
};

@Component({
  selector: 'app-import-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './import-dialog.component.html',
  styleUrl: './import-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportDialogComponent {
  readonly tableName = new FormControl('', [Validators.required]);
  readonly dataTyp = new FormControl('', [Validators.required]);

  public selectedFile: File | null = null;
  public uploadProgress = 0;
  public uploading = false;
  public filename = '';
  public validation: IValidationMessages = {
    tableName: null,
    dataType: null,
  };

  constructor(
    private dataFilesParserService: DataFilesParserService,
    private databaseManagerService: DatabaseManagerService,
    public dialogRef: MatDialogRef<ImportDialogComponent>,
  ) {
    this.dialogRef.disableClose = true;
    this.dialogRef.beforeClosed().subscribe((result) => {
      if (this.validation.dataType != null) {
        result.preventDefault();
      }
    });
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = (input.files as FileList)[0];

    this.validation.dataType = null;

    this.tableName.setValue(file.name
      .substring(0, file.name.lastIndexOf('.'))
      .replaceAll(/\.[^/.]+$/g, '')
      .toLocaleLowerCase());

    if (file.name.endsWith('.csv')) {
      this.dataTyp.setValue('csv');
    } else if (file.name.endsWith('.json')) {
      this.dataTyp.setValue('json');
    } else {
      this.dataTyp.setValue('');
    }

    this.dataTyp.markAllAsTouched();

    if (file) {
      this.selectedFile = file;
      this.uploadProgress = 0;
    }
  }

  public uploadFile(): void {
    if (!this.selectedFile) {
      return;
    }

    if (this.dataTyp.hasError('required')) {
      this.validation.dataType = 'Select the import method';
      return;
    }

    this.uploading = true;

    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        const fileConent = this.dataFilesParserService.parseCSV(
          reader.result as string,
        );

        this.databaseManagerService.setTable(fileConent, this.filename);
      },
      false,
    );

    reader.readAsText(this.selectedFile);
    this.dialogRef.close(true);
  }

  public resetForm(event: Event): void {
    this.selectedFile = null;
    this.uploadProgress = 0;
    this.uploading = false;
    this.filename = '';

    this.validation = {
      dataType: null,
      tableName: null,
    };

    event.stopPropagation();
  }
}
