import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from "./header/header";
import { DailyCalorieCalculator } from "./daily-calorie-calculator/daily-calorie-calculator";

@Component({
  selector: 'app-root',
  imports: [Header, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CaloriCalculator');
  constructor() {}
}
