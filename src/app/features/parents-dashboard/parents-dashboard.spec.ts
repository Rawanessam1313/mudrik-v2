import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsDashboard } from './parents-dashboard';

describe('ParentsDashboard', () => {
  let component: ParentsDashboard;
  let fixture: ComponentFixture<ParentsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentsDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ParentsDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
