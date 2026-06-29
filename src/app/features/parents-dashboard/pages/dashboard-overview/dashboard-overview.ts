
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenService } from '../../services/children.service';
import { ParentProfileService } from '../../services/parent-profile.service';
import { ChildCard } from '../../components/child-card/child-card';
import { ChildDetail } from '../../components/child-detail/child-detail';
import { StudentDto } from '../../models/Iparent';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule, ChildCard, ChildDetail],
  templateUrl: './dashboard-overview.html',
  styleUrl: './dashboard-overview.css',
})
export class DashboardOverview implements OnInit {
  private readonly childrenService = inject(ChildrenService);
  private readonly profileService  = inject(ParentProfileService);

  // ─── Signals ──────────────────────────────────────────────
  readonly parentName    = this.profileService.displayName;   // اسم ولي الأمر
  readonly students      = this.childrenService.students;     // قائمة الأطفال
  readonly activity      = this.childrenService.activity;     // الأحداث الأخيرة
  readonly selectedChild = this.childrenService.selectedChild; // الطفل المختار
  readonly isLoading     = this.childrenService.isLoading;    // loading state

  ngOnInit(): void {
    // نجيب البيانات لما الصفحة تفتح
    this.profileService.loadProfile();
    this.childrenService.loadChildren();
    this.childrenService.loadActivity();
  }

  // لما يضغط "عرض التفاصيل" على كارد
  // لو نفس الطفل → toggle (يقفل)
  // لو طفل تاني → يفتح بتاعه
  onViewDetails(student: StudentDto): void {
    if (this.selectedChild()?.id === student.id) {
      this.childrenService.clearSelection();
    } else {
      this.childrenService.selectChild(student);
    }
  }

  // هل الكارد ده هو المختار؟ → عشان يتلوّن الـ border
  isSelected(student: StudentDto): boolean {
    return this.selectedChild()?.id === student.id;
  }

  // icon لكل نوع activity في قسم "النشاط الأخير"
  activityIcon(type: string): string {
    const map: Record<string, string> = {
      lesson_completed: 'ti ti-circle-check',
      badge_earned:     'ti ti-star',
      profile_updated:  'ti ti-user-plus',
      streak:           'ti ti-flame',
    };
    return map[type] ?? 'ti ti-bell';
  }
}