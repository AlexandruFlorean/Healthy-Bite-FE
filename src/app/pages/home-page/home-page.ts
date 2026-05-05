import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Calendar } from "../calendar/calendar";
import { Meals } from "../meals/meals";
import { ProgressSpinner } from "../progress-spinner/progress-spinner";

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterModule, Calendar, Meals, ProgressSpinner],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  selectedDateString: string = '';
}
