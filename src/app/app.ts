import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './features/home/home';
import { ParentsDashboard } from './features/parents-dashboard/parents-dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, ParentsDashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mudrik_project_front');
}