import { RegisterMealIngredientsDto } from "./register-meal-ingredients-dto.model";

export interface RegisterMealDto {
  name: string;
  userId: string;
  proteins: number;
  calories: number;
  mealIngredients: RegisterMealIngredientsDto[];
}