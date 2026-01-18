import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIngredient } from './new-ingredient';

describe('NewIngredient', () => {
  let component: NewIngredient;
  let fixture: ComponentFixture<NewIngredient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewIngredient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewIngredient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
