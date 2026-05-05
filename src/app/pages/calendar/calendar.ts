import { ChangeDetectionStrategy, Component, model, computed, output, effect } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html',
  styleUrl: 'calendar.css',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Calendar {
  selected = model<Date | null>(new Date());

  date = computed(() => {
    const date = this.selected();
    if (!date) return '';
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  });

  onDateChange = output<string>();

  constructor() {
    effect(() => {
      this.onDateChange.emit(this.date());
    });
  }
}