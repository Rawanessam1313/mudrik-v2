import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyMudrik } from './why-mudrik';

describe('WhyMudrik', () => {
  let component: WhyMudrik;
  let fixture: ComponentFixture<WhyMudrik>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyMudrik],
    }).compileComponents();

    fixture = TestBed.createComponent(WhyMudrik);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
