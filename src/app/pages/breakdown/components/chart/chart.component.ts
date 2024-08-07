import { Component, Input, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ HighchartsChartModule ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {

  @Input('chartData') chartData!: any;

  private options = {
    chart: {
      type: ''
   },
   colors: [],
   title: {
      text: ''
   },
   subtitle : {
      text: ''
   },
   legend : {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: 100,
      floating: true,
      borderWidth: 1,
   },
   xAxis:{
      categories: [],
      title: {
         text: null
      }
   },
   yAxis : {
      min: 0,
      title: {
         text: 'Skill Level Total',
         align: 'high'
      },
      labels: {
         overflow: 'justify'
      }
   },
   tooltip : {
      valuePrefix: 'How Many on the Road: '
   },
   plotOptions : {},
   credits:{
      enabled: false
   },
   series: []
  };

  ngOnInit(): void {
    console.log('chartData = ', this.chartData);
    this.configChartOptions();
  }

  private configChartOptions(): void {
    this.options.chart.type = this.chartData.type;
    this.options.colors = this.chartData.colors;
    this.options.xAxis.categories = this.chartData.xAxiscategories;
    this.options.plotOptions = this.chartData.plotOptions;
    this.options.series = this.chartData.series;
  }

  Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: any = this.options;
}
