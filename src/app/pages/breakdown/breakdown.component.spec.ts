import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakdownComponent } from './breakdown.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CarData } from '../../shared/models/car-data.model';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

describe('BreakdownComponent', () => {
  let component: BreakdownComponent;
  let fixture: ComponentFixture<BreakdownComponent>;
  let store: MockStore<{carData: CarData[]}>;
  const initialState: CarData[] = [];
  let mockDataService;
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

  beforeEach(async () => {
    mockDataService = {
      carDataSubject: of(mockData)
    };

    await TestBed.configureTestingModule({
      imports: [BreakdownComponent, StoreModule.forRoot({})],
      providers: [provideMockStore({ initialState }),]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakdownComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    spyOn(store, 'select').and.returnValue(of(mockData));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate charts with chartdata', () => {
    expect(store.select).toHaveBeenCalled();
    expect(component.charts.length).toBe(2);
    expect(component.charts[0].colors).toEqual([mockData[0].hex]);
    expect(component.dataLoaded).toBeTrue();
  });

  // it('should populate charts with chartdata', () => {
  //   store.select = jasmine.createSpy().and.returnValue([]);
  //   fixture.detectChanges();

  //   // expect(store.select).toHaveBeenCalled();
  //   expect(component.charts.length).toBe(2);
  //   expect(component.charts[0].colors).toEqual([mockData[0].hex]);
  //   expect(component.dataLoaded).toBeTrue();
  // });
});
