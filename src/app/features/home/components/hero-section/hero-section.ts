import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, RouterLink] ,
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection implements OnInit, OnDestroy {

  constructor(private cdr: ChangeDetectorRef) {}

  readonly robotMessages = [
  'أهلاً بك في مُدْرِك 🌱',
  'تعلّم، اكتشف، وطوّر مهاراتك بسهولة ✨',
  'رحلة تعليمية ممتعة تبدأ من هنا 📚',
];
  robotMessageIndex = 0;
  showRobotMessage = true;

  private messageInterval!: ReturnType<typeof setInterval>;


  ngOnInit(): void {

    this.messageInterval = setInterval(() => {

      this.robotMessageIndex =
        (this.robotMessageIndex + 1) % this.robotMessages.length;

      this.cdr.detectChanges();

    }, 3000);

  }


  ngOnDestroy(): void {
    clearInterval(this.messageInterval);
  }


  triggerSpaceshipLaunch(): void {

    this.spaceshipStatus = 'launch';

    setTimeout(() => {
      this.spaceshipStatus = 'idle';
    }, 1000);

  }


  spaceshipStatus: 'idle' | 'launch' = 'idle';

}