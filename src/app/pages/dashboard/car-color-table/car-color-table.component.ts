import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { filter, Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { CarData } from '../../../shared/models/car-data.model';
import { updateCarData } from '../../../store/car-color.actions';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DataService } from '../../../shared/services/data.service';
import { AddCarColorDialogComponent } from '../add-car-color-dialog/add-car-color-dialog.component';


@Component({
  selector: 'app-car-color-table',
  standalone: true,
  imports: [ MatTableModule, MatSortModule, MatDialogModule, MatButtonModule, MatProgressBarModule, CommonModule ],
  templateUrl: './car-color-table.component.html',
  styleUrl: './car-color-table.component.scss'
})
export class CarColorTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('searchInput') searchInput!: ElementRef;

  readonly dialog = inject(MatDialog);

  private carData!: CarData[];
  public loading: boolean = true;
  public carData$!: Observable<CarData[]>
  private carDataSub!: Subscription;

  public displayedColumns: string[] = ['colorName', 'hex', 'colorCategory', 'year', 'amount'];
  public tableFormat: any[] = [
    { name: 'colorName', title: 'Color Name' },
    { name: 'hex', title: 'Hex' },
    { name: 'colorCategory', title: 'Color Category' },
    { name: 'year', title: 'Year' },
    { name: 'amount', title: 'Number of Cars' }
  ]
  public dataSource!: MatTableDataSource<CarData>;

  constructor(private store: Store<{carData: CarData[]}>, private _liveAnnouncer: LiveAnnouncer, private dataService: DataService) {}

  ngOnInit(): void {
    this.carData = this.dataService.getCarData();
    if(this.carData && this.carData.length > 0) { setTimeout(() => { this.loadTable(); }, 500); }

    this.carDataSub = this.dataService.carDataSubject.subscribe((carData: CarData[])=> {
      this.carData = carData;
      this.loadTable();
    });
  }

  private loadSearchTerm(): void {
    const st: string | null = localStorage.getItem('searchTerm');
    this.searchInput.nativeElement.value = st
    let event = new KeyboardEvent('keyup',{'bubbles':true});
    this.searchInput.nativeElement.dispatchEvent(event)
  }

  private loadTable(): void {
    this.loading = false;
    this.dataSource = new MatTableDataSource(this.carData);
    this.dataSource.sort = this.sort;
    if(!this.loading) { this.loadSearchTerm(); }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();
    localStorage.setItem('searchTerm', filterValue);
    this.store.dispatch(updateCarData({carData: this.dataSource.filteredData}));
  }

  public openDialog(): void {
    let dialogRef = this.dialog.open(AddCarColorDialogComponent, {width: '60%'});

    // get the data
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        console.log(res);
        this.mapCarDataAndUpdate(res.data);
      }
    })
  }

  private mapCarDataAndUpdate(data: any): void {
    const carData: CarData = {
      colorName: '',
      hex: '',
      colorCategory: '',
      year: 0,
      amount: 0,
      body: '',
      title: '',
      userId: 0
    };

    carData.colorName = data.colorName;
    carData.hex = data.colorValue;
    carData.colorCategory = data.colorCategory;
    carData.year = +data.colorYear;
    carData.amount = +data.colorNumber;

    this.dataService.updateCarData(carData);
  }

  ngOnDestroy(): void {
    this.carDataSub.unsubscribe();
  }

}
