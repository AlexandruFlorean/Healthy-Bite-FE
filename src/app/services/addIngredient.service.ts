import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegisterIngredientsDto } from "../models/register-ingredients.model";
import { Observable } from "rxjs";
import { IngredientsDtoResponse } from "../models/ingredients-dto-response.model";

@Injectable({
  providedIn: 'root',
})

export class AddIngredientService {
    private baseUrl = 'http://localhost:8080';

    constructor(private readonly httpClient: HttpClient) {}

    addIngredient (registerIngredientDto: RegisterIngredientsDto): Observable<IngredientsDtoResponse> {
        return this.httpClient.post<IngredientsDtoResponse>(`${this.baseUrl}/ingredient`, registerIngredientDto); 
    }

}