import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterMealDto } from '../models/register-meal-dto.model';
import { Observable } from 'rxjs';
import { MealDtoResponse } from '../models/meal-dto-response.model';
import { IngredientsDtoResponse } from '../models/ingredients-dto-response.model';

@Injectable({
  providedIn: 'root',
})
export class MealService {
  private baseUrl = 'http://localhost:8080';

  constructor(private readonly httpClient: HttpClient) {}

  register(registerMealDto: RegisterMealDto): Observable<MealDtoResponse> {
    return this.httpClient.post<MealDtoResponse>(`${this.baseUrl}/meal`, registerMealDto);
  }

  getAllIngredients(): Observable<IngredientsDtoResponse[]> {
    return this.httpClient.get<IngredientsDtoResponse[]>(`${this.baseUrl}/ingredients`);
  }

  getAllMeals(id: String): Observable<MealDtoResponse[]> {
    return this.httpClient.get<MealDtoResponse[]>(`${this.baseUrl}/allMeals?id=${id}`);
  }
}
