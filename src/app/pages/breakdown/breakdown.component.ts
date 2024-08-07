import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarData } from '../../shared/models/car-data.model';
import { Observable, Subscription } from 'rxjs';
import { selectCarData } from '../../store/car-color.selectors';
import { ChartComponent } from './components/chart/chart.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-breakdown',
  standalone: true,
  imports: [ ChartComponent, CommonModule, MatProgressBarModule ],
  templateUrl: './breakdown.component.html',
  styleUrl: './breakdown.component.scss'
})
export class BreakdownComponent implements OnInit, OnDestroy {
  private carData$!: Observable<CarData[]>;
  private carDataSub!: Subscription;
  public charts: any[] = [];
  private typesOfCharts: string[] = ['column', 'areaspline'];
  public dataLoaded: boolean = false;
  public loading: boolean = true;

  constructor(private store: Store<{ carData: CarData[]}>, private dataService: DataService) {}

  ngOnInit(): void {
    this.carData$ = this.store.select(selectCarData);

    console.log('this.carData$ = ', this.carData$)

    this.carDataSub = this.carData$.subscribe((carData: CarData[]) => {
      if(carData.length <= 0) {
        this.dataService.carDataSubject.subscribe((data: CarData[]) => { this.buildChartData(data); });

        return;
      }

      this.buildChartData(carData);
    });
  }

  private buildChartData(carData: CarData[]): void {
    this.loading = false;

    for(let i: number = 0; i < this.typesOfCharts.length; i++) {
      this.charts.push({
        type: this.typesOfCharts[i],
        colors: [],
        xAxiscategories: [],
        plotOptions: {
          column: {
            dataLabels: {
               enabled: true
            }
          }
        },
        series: []
      });
      if(this.typesOfCharts[i] === 'column') {
        this.charts[i].plotOptions['series'] = { stacking: 'normal' };
      }
      if(this.typesOfCharts[i] === 'areaspline') {
        this.charts[i].plotOptions['series'] = { pointStart: 0, pointPlacement: 'on' };
        this.charts[i].plotOptions['areaspline'] = { fillOpacity: 0.5 };
      }

      carData.forEach(item => {
        let data: number[] = [];
        if(item.year === 2022) { console.log('item.amount ', item.amount);data = [item.amount, 0, 0]; }
        if(item.year === 2023) { data = [0, item.amount, 0]; }
        if(item.year === 2024) { data = [0, 0, item.amount]; }
        this.charts[i].colors.push(item.hex);
        this.charts[i].xAxiscategories.push(item.year);
        this.charts[i].series.push({
          name: item.colorName,
          data: data
        })
      });
      let uniq = (a: number[]) => [...new Set(a)];
      this.charts[i].xAxiscategories = uniq(this.charts[i].xAxiscategories);
    }

    this.dataLoaded = true;
  }

  ngOnDestroy(): void {
    this.carDataSub.unsubscribe();
  }
}
