import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-parents-dashboard',
  imports: [RouterOutlet ,Sidebar],
  templateUrl: './parents-dashboard.html',
  styleUrls: ['./parents-dashboard.css'],
})
export class ParentsDashboard {}
