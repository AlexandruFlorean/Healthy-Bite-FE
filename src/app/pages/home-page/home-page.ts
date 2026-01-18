import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/Meal.service';
import { MealDtoResponse } from '../../models/meal-dto-response.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  meals: MealDtoResponse[] = [];
  constructor(private readonly mealService: MealService) {}

  ngOnInit(): void {
    this.loadMeals();
  }

  loadMeals() {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('Nu ești logat!');
      return;
    }

    this.mealService.getAllMeals(userId).subscribe({
      next: (data) => {
        this.meals = data;
        console.log('Mese primite:', data);
      },
      error: (err) => {
        console.error('Eroare la încărcarea meselor:', err);
      }
    });
  }

}
