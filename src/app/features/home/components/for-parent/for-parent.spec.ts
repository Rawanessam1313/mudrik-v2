import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForParent } from './for-parent';

describe('ForParent', () => {
  let component: ForParent;
  let fixture: ComponentFixture<ForParent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForParent],
    }).compileComponents();

    fixture = TestBed.createComponent(ForParent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
