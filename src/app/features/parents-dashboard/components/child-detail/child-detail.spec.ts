import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDetail } from './child-detail';

describe('ChildDetail', () => {
  let component: ChildDetail;
  let fixture: ComponentFixture<ChildDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
