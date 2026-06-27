import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PDashboardHeader } from './components/p-dashboard-header/p-dashboard-header';

@Component({
  selector: 'app-parents-dashboard',
  imports: [RouterOutlet, PDashboardHeader],
  templateUrl: './parents-dashboard.html',
  styleUrls: ['./parents-dashboard.css'],
})
export class ParentsDashboard {}
