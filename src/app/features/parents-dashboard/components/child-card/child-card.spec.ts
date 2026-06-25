import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCard } from './child-card';

describe('ChildCard', () => {
  let component: ChildCard;
  let fixture: ComponentFixture<ChildCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
