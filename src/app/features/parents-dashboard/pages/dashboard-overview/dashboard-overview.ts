import { Component, inject } from '@angular/core';
import { ParentProfileService } from '../../services/parent-profile.service';
import { ChildCard } from '../../components/child-card/child-card';

@Component({
  selector: 'app-dashboard-overview',
  imports: [ChildCard],
  templateUrl: './dashboard-overview.html',
  styleUrl: './dashboard-overview.css',
})
export class DashboardOverview {
  private readonly profileService = inject(ParentProfileService);

  readonly parentName = this.profileService.displayName;

  readonly stats = [
    { label: 'الأطفال المسجّلون', value: '2', icon: 'ti-users', color: 'sky' },
    { label: 'دروس مكتملة', value: '18', icon: 'ti-book', color: 'green' },
    { label: 'ساعات التعلّم', value: '12', icon: 'ti-clock', color: 'coral' },
    { label: 'إنجازات', value: '7', icon: 'ti-trophy', color: 'yellow' },
  ];

  readonly children = [
    { name: 'سارة', age: 8, progress: 72, avatar: null },
    { name: 'يوسف', age: 6, progress: 58, avatar: null },
  ];
}
