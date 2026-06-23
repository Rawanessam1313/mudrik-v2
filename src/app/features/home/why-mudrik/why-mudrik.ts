import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';

interface ChallengeItem {
  text: string;
}
 
interface SolutionItem {
  text: string;
}
 
interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-why-mudrik',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-mudrik.html',
  styleUrls: ['./why-mudrik.css'],
})

export class WhyMudrik implements AfterViewInit, OnDestroy {
 
  @ViewChild('challengesSection') challengesSection!: ElementRef<HTMLElement>;
  @ViewChild('featuresSection') featuresSection!: ElementRef<HTMLElement>;
  @ViewChildren('featCard') featCards!: QueryList<ElementRef<HTMLElement>>;
 
  readonly challenges: ChallengeItem[] = [
    { text: 'صعوبة في ملاحقة المنهج الدراسي الموحد' },
    { text: 'تشتت الانتباه بسبب كثرة النصوص والضجيج البصري' },
    { text: 'نقص الدعم المخصص لاحتياجات عسر القراءة' },
    { text: 'غياب الإحصائيات الدقيقة للأهل عن التقدم الفعلي' }
  ];
 
  readonly solutions: SolutionItem[] = [
    { text: 'محتوى يتكيف تلقائياً مع مستوى وقدرات الطفل' },
    { text: 'واجهة بسيطة، خطوط مخصصة، ودعم صوتي كامل' },
    { text: 'تحويل النصوص إلى خرائط ذهنية ورسوم توضيحية' },
    { text: 'تقارير ذكية يومية وأسبوعية مفصلة لكل ولي أمر' }
  ];
 
  readonly features: FeatureCard[] = [
    {
      icon: 'brain',
      title: 'دروس تكيفية بالذكاء الاصطناعي',
      description: 'تغيير وتيرة وشكل الدرس بناءً على استجابة طفلك ولحظات تشتته'
    },
    {
      icon: 'puzzle',
      title: 'تقييم تشخيصي ممتع',
      description: 'قياس مهارات القراءة والكتابة والانتباه من خلال ألعاب تفاعلية'
    },
    {
      icon: 'letter-case',
      title: 'دعم عسر القراءة',
      description: 'استخدام خطوط  وتنسيقات بصرية تمنع التداخل البصري'
    },
    {
      icon: 'focus-2',
      title: 'نظام تركيز ADHD',
      description: 'تنبيهات لطيفة وفواصل مدروسة للحفاظ على طاقة الطفل الذهنية'
    },
    {
      icon: 'trophy',
      title: 'جوائز',
      description: 'نقاط، أوسمة، ومستويات تحفز الطفل على الاستمرار والإنجاز'
    },
    {
      icon: 'chart-dots',
      title: 'لوحة تحكم الأهل',
      description: 'متابعة دقيقة لكل تفاصيل الجلسات والتقدم المحرز في المواد'
    },
    {
      icon: 'volume',
      title: 'سرد صوتي كامل',
      description: 'دعم قراءة النصوص بأصوات طبيعية لمساعدة الطفل على الاستيعاب'
    },
    {
      icon: 'report-search',
      title: 'تقارير الفجوات المعرفية',
      description: 'تحديد المواضيع التي يحتاج فيها الطفل لدعم إضافي بدقة متناهية'
    }
  ];
 
  private sectionObserver?: IntersectionObserver;
  private cardObserver?: IntersectionObserver;
 
  ngAfterViewInit(): void {
    this.initSectionObserver();
    this.initCardObserver();
  }
 
  private initSectionObserver(): void {
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.sectionObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
 
    if (this.challengesSection) {
      this.sectionObserver.observe(this.challengesSection.nativeElement);
    }
    if (this.featuresSection) {
      this.sectionObserver.observe(this.featuresSection.nativeElement);
    }
  }
 
  private initCardObserver(): void {
    this.cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = index * 60;
            setTimeout(() => el.classList.add('is-visible'), delay);
            this.cardObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
 
    this.featCards.forEach((card) => {
      this.cardObserver?.observe(card.nativeElement);
    });
  }
 
  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    this.cardObserver?.disconnect();
  }
}