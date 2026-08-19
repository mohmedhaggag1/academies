import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MatDatepickerModule,
  MatDateRangePicker
} from '@angular/material/datepicker';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'date-range-filter',
  standalone: true,
  imports: [
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './date-range.html',
  styleUrl: './date-range.scss',
})
export class DateRange {

  startDate: Date | null = null;
  endDate: Date | null = null;

  today = new Date();

  @Output() dateRangeChange = new EventEmitter<{
    startDate: Date | null;
    endDate: Date | null;
  }>();

  openPicker(picker: MatDateRangePicker<Date>): void {
    picker.open();
  }

  onDateChange(): void {
    this.dateRangeChange.emit({
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }

  getDateRangeLabel(): string {
    if (!this.startDate && !this.endDate) {
      return 'Date range';
    }

    if (this.startDate && !this.endDate) {
      return this.formatDate(this.startDate);
    }

    if (!this.startDate && this.endDate) {
      return this.formatDate(this.endDate);
    }

    return `${this.formatDate(this.startDate!)} - ${this.formatDate(this.endDate!)}`;
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  }
}