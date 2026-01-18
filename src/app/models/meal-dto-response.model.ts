import { IngredientsDtoResponse } from "./ingredients-dto-response.model";
import { MealIngredientDtoResponse } from "./meal-ingredient-dto-response.model";
import { RegisterMealIngredientsDto } from "./register-meal-ingredients-dto.model";

export interface MealDtoResponse {
    id: string;
  name: string;
  timestamp: Date;
  userId: string;
  mealIngredients: MealIngredientDtoResponse[];
}