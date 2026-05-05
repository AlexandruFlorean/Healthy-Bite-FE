import { Component, input, OnInit, signal, computed } from '@angular/core';
import { MealDtoResponse } from '../../models/meal-dto-response.model';
import { MealService } from '../../services/Meal.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'meals',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatChipsModule],
  templateUrl: './meals.html',
  styleUrl: './meals.css',
})
export class Meals implements OnInit {
  allMeals = signal<MealDtoResponse[]>([]);
  filterDate = input<string>('');

  meals = computed(() => {
    const dateToFilter = this.filterDate();
    const currentMeals = this.allMeals();

    if (!dateToFilter) {
      return currentMeals;
    }
    return currentMeals.filter(meal => meal.timestamp === dateToFilter);
  });

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
        this.allMeals.set(data);
      },
      error: (err) => {
        console.error('Eroare la încărcarea meselor:', err);
      }
    });
  }

  deleteMeal(meal: MealDtoResponse) {
    if (confirm('Ești sigur că vrei să ștergi această masă?')) {
      this.mealService.deleteMeal(meal.id).subscribe({
        next: () => {
          console.log('Masa a fost ștearsă cu succes.');
          this.loadMeals();
        },
        error: (err) => {
          console.error('Eroare la ștergerea mesei:', err);
        }
      });
    }
  }
}