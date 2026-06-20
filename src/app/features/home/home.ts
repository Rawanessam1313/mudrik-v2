import { Component } from '@angular/core';
import { HeroSection } from './components/hero-section/hero-section';
import { NavBar } from './components/nav-bar/nav-bar';
import { StatsSection } from './components/stats-section/stats-section';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBar, HeroSection, StatsSection],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {}
