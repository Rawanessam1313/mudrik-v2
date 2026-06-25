import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

interface TimelineStep {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-mudrik-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-mudrik-work.html',
  styleUrl: './how-mudrik-work.css',
})
export class HowMudrikWork implements OnInit, OnDestroy {

  readonly steps: TimelineStep[] = [
    { id: 1, title: 'تسجيل ولي الأمر',      description: 'أنشئ حسابك الخاص وادخل عالم مُدْرِك التعليمي.' },
    { id: 2, title: 'إضافة الطفل',           description: 'أضف بيانات طفلك واهتماماته.' },
    { id: 3, title: 'التقييم التشخيصي',      description: 'اختبار تفاعلي ممتع يحدد نقاط القوة والاحتياجات بدقة.' },
    { id: 4, title: 'رحلة تعلم مخصصة',       description: 'بدء الدروس التي تتغير وتتطور مع تطور مستوى طفلك.' },
    { id: 5, title: 'تجربة ممتعة للطفل',     description: 'شعلة إنجاز يومية، أوسمة فخر، ومكافآت فورية تجعل التعلم احتفالاً.' },
  ];

  activeStep = 1;

  private autoPlayTimer?: ReturnType<typeof setInterval>;
  private readonly autoPlayIntervalMs = 2000;
  private intersectionObserver?: IntersectionObserver; // ← جديد

  constructor(private el: ElementRef) {} // ← جديد

  ngOnInit(): void {
    this.setupIntersectionObserver(); // ← بدل startAutoPlay مباشرة
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
    this.intersectionObserver?.disconnect(); // ← جديد
  }

  selectStep(stepId: number): void {
    this.activeStep = stepId;
  }

  isActive(stepId: number): boolean {
    return this.activeStep === stepId;
  }

  get activeStepData(): TimelineStep {
    return this.steps.find(s => s.id === this.activeStep) ?? this.steps[0];
  }

  // ── IntersectionObserver ────────────────────────────────────────────
  private setupIntersectionObserver(): void {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0].isIntersecting;
        if (isVisible) {
          this.startAutoPlay();
        } else {
          this.stopAutoPlay();
        }
      },
      { threshold: 0.3 } // يبدأ لما 30% من الـ component يظهر
    );

    this.intersectionObserver.observe(this.el.nativeElement);
  }

  // ── AutoPlay ────────────────────────────────────────────────────────
  private startAutoPlay(): void {
    if (this.autoPlayTimer) return; // تجنب تشغيل timer مكرر

    this.autoPlayTimer = setInterval(() => {
      this.activeStep = this.activeStep >= this.steps.length ? 1 : this.activeStep + 1;
    }, this.autoPlayIntervalMs);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }
}