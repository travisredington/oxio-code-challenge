import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BreakdownComponent } from './pages/breakdown/breakdown.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'breakdown', component: BreakdownComponent }
];
