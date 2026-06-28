import { Component } from '@angular/core';
import { HeroSection } from './components/hero-section/hero-section';
import { NavBar } from './components/nav-bar/nav-bar';
import { StatsSection } from './components/stats-section/stats-section';
import { WhyMudrik } from './components/why-mudrik/why-mudrik';
import { HowMudrikWork } from './components/how-mudrik-work/how-mudrik-work';
import { ForParent } from './components/for-parent/for-parent';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBar, HeroSection, StatsSection, WhyMudrik, HowMudrikWork, ForParent, Footer],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {}
