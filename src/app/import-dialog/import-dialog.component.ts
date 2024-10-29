import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataFilesParserService } from '../services/data-files-paser.service';
import { DatabaseManagerService } from '../services/database-manager.service';

@Component({
  selector: 'app-import-dialog',
  standalone: true,
  imports: [MatButtonModule, MatProgressBarModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './import-dialog.component.html',
  styleUrl: './import-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ImportDialogComponent>);

  public selectedFile: File | null = null;
  public uploadProgress: number = 0;
  public uploading: boolean = false;

  constructor(
    private dataFilesParserService: DataFilesParserService,
    private databaseManagerService: DatabaseManagerService) {
  }

  public onFileSelected(event: any): void {
    const file = event.target.files[0];

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
      "load",
      () => {
        this.databaseManagerService.setTable(
          this.dataFilesParserService.parseCSV(reader.result as string),
          'abc');
      },
      false,
    );

    reader.readAsText(this.selectedFile);
  }

  public resetForm(): void {
    this.selectedFile = null;
    this.uploadProgress = 0;
    this.uploading = false;
  }
}
