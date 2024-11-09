import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DataFilesParserService } from '../services/data-files-paser.service';
import { DatabaseManagerService } from '../services/database-manager.service';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface IValidationMessages {
  tableName: string | null;
  dataType: string | null;
}

@Component({
  selector: 'app-import-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './import-dialog.component.html',
  styleUrl: './import-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportDialogComponent {
  readonly tableName = new FormControl('', [Validators.required]);
  readonly dataType = new FormControl('', [Validators.required]);

  public selectedFile: File | null = null;
  public uploadProgress = 0;
  public uploading = false;
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

    this.tableName.valueChanges.subscribe(this.onTableNameChange.bind(this));
    this.dataType.valueChanges.subscribe(this.onDataTypeChange.bind(this));
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = (input.files as FileList)[0];

    this.validation.dataType = null;

    this.tableName.setValue(
      file.name
        .substring(0, file.name.lastIndexOf('.'))
        .replaceAll(/\.[^/.]+$/g, '')
        .toLocaleLowerCase(),
    );

    if (file.name.endsWith('.csv')) {
      this.dataType.setValue('csv');
    } else if (file.name.endsWith('.json')) {
      this.dataType.setValue('json');
    } else {
      this.dataType.setValue('');
    }

    this.dataType.markAllAsTouched();
    this.tableName.markAllAsTouched();

    if (file) {
      this.selectedFile = file;
      this.uploadProgress = 0;
    }
  }

  public uploadFile(): void {
    if (!this.selectedFile) {
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

        this.databaseManagerService.setTable(
          fileConent,
          this.tableName.getRawValue()!,
        );
      },
      false,
    );

    reader.readAsText(this.selectedFile);
    this.dialogRef.close(true);
  }

  public onFormReset(event: Event): void {
    this.selectedFile = null;
    this.uploadProgress = 0;
    this.uploading = false;

    this.validation = {
      dataType: null,
      tableName: null,
    };

    event.stopPropagation();
  }

  public onTableNameChange() {
    if (this.tableName.hasError('required')) {
      this.validation.tableName = 'Provide the table name';
    } else {
      this.validation.tableName = null;
    }
  }

  public onDataTypeChange() {
    if (this.dataType.hasError('required')) {
      this.validation.dataType = 'Select the import method';
    } else {
      this.validation.dataType = null;
    }
  }
}
