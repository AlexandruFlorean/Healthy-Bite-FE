import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { IngredientsDtoResponse } from '../../models/ingredients-dto-response.model';
import { RegisterMealDto } from '../../models/register-meal-dto.model';
import { MealService } from '../../services/Meal.service';

@Component({
  selector: 'app-add-meal',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, CommonModule, MatIconModule, MatButtonModule, MatListModule, RouterModule],
  templateUrl: './add-meal.html',
  styleUrl: './add-meal.css',
})
export class AddMeal implements OnInit {
  ingredients: IngredientsDtoResponse[] = [];
  addMealForm!: FormGroup;
  registeredMealId: string | null = null;
  currentIngredientControl = new FormControl('', Validators.required);
  currentQuantityControl = new FormControl('', Validators.required);
  currentUserId = localStorage.getItem('userId');

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly MealService: MealService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.addMealForm = this.formBuilder.group({
      mealName: ['', Validators.required],
      userId: [this.currentUserId, Validators.required],
      ingredientsList: this.formBuilder.array([])
    });
    this.loadIngredients();
  }

  get ingredientsArray(): FormArray {
    return this.addMealForm.get('ingredientsList') as FormArray;
  }

  addIngredientToTable() {
    if (this.currentIngredientControl.invalid || this.currentQuantityControl.invalid) {
      return;
    }

    const ingredientId = this.currentIngredientControl.value;
    const quantity = this.currentQuantityControl.value;

   
    const newIngredient = this.formBuilder.group({
      ingredientId: [ingredientId],
      quantity: [quantity]
    });

    this.ingredientsArray.push(newIngredient);
    this.currentIngredientControl.reset();
    this.currentQuantityControl.reset();
  }

  getIngredientName(id: string): string {
    const found = this.ingredients.find(i => i.id === id);
    return found ? found.ingredientName : 'Necunoscut';
  }

  removeIngredient(index: number) {
    this.ingredientsArray.removeAt(index);
  }

  loadIngredients() {
    this.MealService.getAllIngredients().subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
  }

  addMeal() {
    if (this.addMealForm.invalid) {
      console.log('Add Meal Form is invalid');
      return;
    }

    const formData = this.addMealForm.value;
    const registerMealDto: RegisterMealDto = {
      name: formData.mealName,
      userId: formData.userId,
      mealIngredients: this.ingredientsArray.value,
    };

    this.MealService.register(registerMealDto).subscribe((mealDto) => {
      this.registeredMealId = mealDto.id;
      console.log('Registered User ID:', mealDto.id);
      this.router.navigate(['/home-page']);
    });
}
}
