import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './features/home/home';
import { LoginPageComponent } from './features/auth/components/login-page/login-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home ,LoginPageComponent ,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mudrik_project_front');
}