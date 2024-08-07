import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-add-car-color-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-car-color-dialog.component.html',
  styleUrl: './add-car-color-dialog.component.scss'
})
export class AddCarColorDialogComponent {
  public form: any = {
    colorName: '',
    colorValue: '',
    colorCategory: '',
    colorYear: '',
    colorNumber: ''
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
  public dialogRef: MatDialogRef<AddCarColorDialogComponent>) { }

  public onSubmit(val: any): void {
    this.dialogRef.close({ data: val })
  }
}
