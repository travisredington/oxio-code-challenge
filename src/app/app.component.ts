import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './global/header/header.component';

import { DataService } from './shared/services/data.service';
import { FooterComponent } from './global/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, HeaderComponent, FooterComponent ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.fetchCarData();
  }
}
