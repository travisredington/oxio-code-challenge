import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarColorTableComponent } from './car-color-table.component';
import { Store, StoreModule } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CarData } from '../../../shared/models/car-data.model';
import { DataService } from '../../../shared/services/data.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { updateCarData } from '../../../store/car-color.actions';
import { MatDialogRef } from '@angular/material/dialog';

describe('CarColorTableComponent', () => {
  let component: CarColorTableComponent;
  let fixture: ComponentFixture<CarColorTableComponent>;
  let mockDataService: any;
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

  let localStore: any;
  let store: MockStore<{carData: CarData[]}>;
  let action;
  const initialState: CarData[] = [];

  beforeEach(async () => {
    mockDataService = {
      carData: mockData,
      getCarData: () => {
        return mockData;
      },
      carDataSubject: of(mockData),
      updateCarData: () => {}
    };

    localStore = {'searchTerm': 'blue'};

    spyOn(localStorage, 'getItem').and.callFake((key) => {
      return localStore[key]
    }
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );

    await TestBed.configureTestingModule({
      imports: [CarColorTableComponent, StoreModule.forRoot({})],
      providers: [
        provideAnimationsAsync(),
        { provide: DataService, useValue: mockDataService },
        provideMockStore({ initialState }),
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarColorTableComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;

    spyOn(store, 'dispatch').and.callFake((action)=>{console.log('this is a test');});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate datasource.filteredData with mockdata', () => {
    expect(component.dataSource.filteredData).toBe(mockData);
  });

  it('should set loading to false', () => {
    expect(component.loading).toBeFalse();
  });

  it('should have called localstorage getItem with "searchTerm"', ()=> {
    expect(localStorage.getItem).toHaveBeenCalledWith('searchTerm');
  });

  it('should call localStorage setItem and store.dispatch() when applyFilter() is called', () => {
    const searchTerm = 'blue';
    const compiled = fixture.debugElement;
    const input = compiled.query(By.css('input')).nativeElement;
    input.value = searchTerm;
    input.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();

    expect(localStorage.setItem).toHaveBeenCalledWith('searchTerm', searchTerm);
    expect(component.dataSource.filteredData).toEqual(mockData);
    action = updateCarData({ carData: component.dataSource.filteredData });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should call dialog open and close when calling openDialog()', () => {
    const openCloseSpy = spyOn(component.dialog, 'open')
    .and
    .returnValue({
        afterClosed: () => of({ data: mockData })
    } as MatDialogRef<typeof component>);

    component.openDialog();

    fixture.detectChanges();

    expect(openCloseSpy).toHaveBeenCalled();
  });
});
