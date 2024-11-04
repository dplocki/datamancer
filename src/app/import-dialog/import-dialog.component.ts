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
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule,
    MatProgressBarModule,
  ],
  templateUrl: './import-dialog.component.html',
  styleUrl: './import-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ImportDialogComponent>);

  public selectedFile: File | null = null;
  public uploadProgress = 0;
  public uploading = false;
  public filename = '';
  public selectedDataType = '';
  public validation: Record<string, string | null> = {
    selectedDataType: null,
  };

  constructor(
    private dataFilesParserService: DataFilesParserService,
    private databaseManagerService: DatabaseManagerService,
  ) {}

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = (input.files as FileList)[0];

    this.validation['selectedDataType'] = null;

    this.filename = file.name
      .substring(0, file.name.lastIndexOf('.'))
      .replaceAll(/\.[^/.]+$/g, '')
      .toLocaleLowerCase();

    if (file.name.endsWith('.csv')) {
      this.selectedDataType = 'csv';
    } else if (file.name.endsWith('.json')) {
      this.selectedDataType = 'json';
    } else {
      this.selectedDataType = '';
    }

    if (file) {
      this.selectedFile = file;
      this.uploadProgress = 0;
    }
  }

  public uploadFile(event: Event): void {
    if (!this.selectedFile) {
      event.preventDefault();
      return;
    }

    if (this.selectedDataType === '') {
      this.validation['selectedDataType'] = 'Select the import method';
      event.preventDefault();
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
  }

  public resetForm(event: Event): void {
    this.selectedFile = null;
    this.uploadProgress = 0;
    this.uploading = false;
    this.filename = '';
    this.selectedDataType = '';

    this.validation['selectedDataType'] = null;

    event.stopPropagation();
  }
}
