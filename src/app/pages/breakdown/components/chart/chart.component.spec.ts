import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let mockChartData: any = {
    type: 'column',
    colors: ['#eeeeee'],
    xAxiscategories: ['2022'],
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [{name: 'test', data: [100]}]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.chartData = mockChartData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate chartData with mockData', () => {
    expect(component.chartData.type).toBe(mockChartData.type);
    expect(component.chartData.colors).toEqual(mockChartData.colors);
    expect(component.chartData.xAxiscategories).toEqual(mockChartData.xAxiscategories);
    expect(component.chartData.plotOptions).toEqual(mockChartData.plotOptions);
    expect(component.chartData.series).toEqual(mockChartData.series);
  });
});
