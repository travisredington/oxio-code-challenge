import { inject, Injectable } from "@angular/core";
import { mockData } from "../data/mock.data";
import { CarData } from "../models/car-data.model";
import { Subject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../dialogs/error-dialog/error-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public carDataSubject: Subject<CarData[]> = new Subject<CarData[]>();
  private carData: CarData[] = [];
  readonly dialog = inject(MatDialog);

  constructor() {}

  public fetchCarData(): void {
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify([mockData]),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => {
      this.carData = json[0];
      this.updateCarDataSub();
    })
    .catch(err => {
      this.openDialog(err);
    });
  }

  private updateCarDataSub(): void {
    console.log('updateCarDataSub', this.carData);
    this.carDataSubject.next([...this.carData]);
  }

  public getCarData(): CarData[] {
    return [...this.carData];
  }

  public updateCarData(carData: CarData): void {
    this.carData.push(carData);
    this.updateCarDataSub();
  }

  public openDialog(err: any): void {
    this.dialog.open(ErrorDialogComponent, {width: '60%', data: { error: err }});
  }
}
