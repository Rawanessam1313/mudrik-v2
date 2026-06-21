import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, } from '@angular/core';
 
interface TimelineStep {
  id: number;
  title: string;
  description: string;
}
 
@Component({
  selector: 'app-how-mudrik-work',
  imports: [CommonModule],
  templateUrl: './how-mudrik-work.html',
  styleUrl: './how-mudrik-work.css',
})

export class HowMudrikWork implements OnInit, OnDestroy {
 
  readonly steps: TimelineStep[] = [
    {
      id: 1,
      title: 'تسجيل ولي الأمر',
      description: 'أنشئ حسابك الخاص وادخل عالم مُدْرِك التعليمي.'
    },
    {
      id: 2,
      title: 'إضافة الطفل',
      description: 'أضف بيانات طفلك واهتماماته.'
    },
    {
      id: 3,
      title: 'التقييم التشخيصي',
      description: 'اختبار تفاعلي ممتع يحدد نقاط القوة والاحتياجات بدقة.'
    },
    {
      id: 4,
      title: 'رحلة تعلم مخصصة',
      description: 'بدء الدروس التي تتغير وتتطور مع تطور مستوى طفلك.'
    },
    {
      id: 5,
      title: 'تجربة ممتعة للطفل',
      description: 'شعلة إنجاز يومية، أوسمة فخر، ومكافآت فورية تجعل التعلم احتفالاً.'
    }
  ];
 
  activeStep = 1;
 
  private autoPlayTimer?: ReturnType<typeof setInterval>;
  private readonly autoPlayIntervalMs = 4000;
  private userInteracted = false;
 
  ngOnInit(): void {
    this.startAutoPlay();
  }
 
  ngOnDestroy(): void {
    this.stopAutoPlay();
  }
 
  selectStep(stepId: number): void {
    this.activeStep = stepId;
    this.stopAutoPlay();
    this.userInteracted = true;
  }
 
  isActive(stepId: number): boolean {
    return this.activeStep === stepId;
  }
 
  get activeStepData(): TimelineStep {
    return this.steps.find(s => s.id === this.activeStep) ?? this.steps[0];
  }
 
  private startAutoPlay(): void {
    if (this.userInteracted) {
      return;
    }
    this.autoPlayTimer = setInterval(() => {
      const next = this.activeStep === this.steps.length ? 1 : this.activeStep + 1;
      this.activeStep = next;
    }, this.autoPlayIntervalMs);
  }
 
  private stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }
}
 