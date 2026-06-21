import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowMudrikWork } from './how-mudrik-work';

describe('HowMudrikWork', () => {
  let component: HowMudrikWork;
  let fixture: ComponentFixture<HowMudrikWork>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowMudrikWork],
    }).compileComponents();

    fixture = TestBed.createComponent(HowMudrikWork);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
