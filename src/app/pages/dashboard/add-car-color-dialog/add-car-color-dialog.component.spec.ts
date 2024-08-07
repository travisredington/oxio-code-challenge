import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarColorDialogComponent } from './add-car-color-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('AddCarColorDialogComponent', () => {
  let component: AddCarColorDialogComponent;
  let fixture: ComponentFixture<AddCarColorDialogComponent>;
  let mockDialogData: any = {};
  let mockDialogRef: any = {
    close({}) {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCarColorDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarColorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call dialog.close() when onSubmit() is called', () => {
    const val: any = {'test': 'test'};
    const dialogCloseSpy = spyOn(component.dialogRef, 'close').and.callThrough();

    component.onSubmit(val);

    fixture.detectChanges();

    expect(dialogCloseSpy).toHaveBeenCalledWith({data: val});
  });
});
