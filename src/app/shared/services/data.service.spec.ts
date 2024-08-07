import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ErrorDialogComponent } from "../dialogs/error-dialog/error-dialog.component";
import { DataService } from "./data.service";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { CarData } from "../models/car-data.model";

describe('DataService', () => {
  let component: ErrorDialogComponent;
  let fixture: ComponentFixture<ErrorDialogComponent>;
  const dialogMock = {
    open: () => {}
  };
  let service: DataService;
  let mockData: CarData[] = [
    {
      colorName: 'Prussian Blue',
      hex: '#2a2ab1',
      colorCategory: 'Blue',
      year: 2022,
      amount: 10000,
      body: 'test',
      title: 'test',
      userId: 11
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErrorDialogComponent],
      providers: [
        DataService,
        { provide: MatDialogRef, useValue: dialogMock }
      ],
      teardown: {destroyAfterEach: false}
    });
    service = TestBed.inject(DataService);
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response(JSON.stringify([mockData]))));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return carData when calling getCarData()', (done) => {
    service.fetchCarData();

    service.carDataSubject.subscribe((data: CarData[])=> {
      expect(data).toBeTruthy();
      expect(data[0].colorName).toBe(mockData[0].colorName);
      expect(data[0].hex).toBe(mockData[0].hex);
      expect(data[0].colorCategory).toBe(mockData[0].colorCategory);
      done();
    });

    expect(window.fetch).toHaveBeenCalled();
  });

  it('should call open on dialog when openDialog() is called', () => {
    spyOn(service.dialog, 'open').and.callThrough();
    service.openDialog('');

    expect(service.dialog.open).toHaveBeenCalled();
  });
});
