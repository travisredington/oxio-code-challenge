import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataService } from './shared/services/data.service';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BreakdownComponent } from './pages/breakdown/breakdown.component';

describe('AppComponent', () => {
  let mockDataService: DataService;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj(['fetchCarData']);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterModule.forRoot(
          [
            {path: '', component: DashboardComponent},
            {path: 'breakdown', component: BreakdownComponent}
          ]
        )
      ],
      providers: [{ provide: DataService, useValue: mockDataService }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have the 'dashboard' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('dashboard');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, dashboard');
  // });
});
