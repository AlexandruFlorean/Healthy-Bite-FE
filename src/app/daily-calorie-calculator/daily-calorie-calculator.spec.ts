import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyCalorieCalculator } from './daily-calorie-calculator';

describe('DailyCalorieCalculator', () => {
  let component: DailyCalorieCalculator;
  let fixture: ComponentFixture<DailyCalorieCalculator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyCalorieCalculator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyCalorieCalculator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
