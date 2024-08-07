import { Component } from '@angular/core';
import { CarColorTableComponent } from './car-color-table/car-color-table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CarColorTableComponent, CommonModule ],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor() {}

}
