import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDashboardHeader } from './p-dashboard-header';

describe('PDashboardHeader', () => {
  let component: PDashboardHeader;
  let fixture: ComponentFixture<PDashboardHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PDashboardHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(PDashboardHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
