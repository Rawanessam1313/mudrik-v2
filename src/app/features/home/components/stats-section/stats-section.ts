import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-section.html',
  styleUrls: ['./stats-section.css'],
})
export class StatsSection implements OnInit {

  stats = [
    { target: 95, current: 0, suffix: '%', label: 'تفاعل تعليمي أعلى' },
    { target: 4, current: 0, suffix: 'x', label: 'أضعاف تركيز أفضل' },
    { target: 12, current: 0, suffix: '', label: 'دقيقة متوسط الجلسة' },
    { target: 100, current: 0, suffix: '%', label: 'مطابق للمنهج المصري' },
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.stats.forEach(stat => this.animateCounter(stat, 5000));
  }

  animateCounter(stat: any, duration: number): void {
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      stat.current = Math.floor(progress * stat.target);

      this.cdr.markForCheck();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        stat.current = stat.target;
      }
    };

    requestAnimationFrame(update);
  }
}