import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
        console.log(reader.result);
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
