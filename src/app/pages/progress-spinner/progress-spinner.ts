import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-progress-spinner',
  imports: [MatProgressSpinnerModule, MatCardModule],
  templateUrl: './progress-spinner.html',
  styleUrl: './progress-spinner.css',
})
export class ProgressSpinner {
  targetProteins = 120;
  targetCalories = 2000;

  


consumedCalories = 1450;
consumedProteins = 85;

getPercentage(consumed: number, target: number): number {
  return Math.min((consumed / target) * 100, 100);
}
}
