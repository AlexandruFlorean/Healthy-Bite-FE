import { RegisterMealIngredientsDto } from "./register-meal-ingredients-dto.model";

export interface RegisterMealDto {
  name: string;
  userId: string;
  mealIngredients: RegisterMealIngredientsDto[];
}