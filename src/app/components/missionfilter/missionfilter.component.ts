import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-missionfilter',
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class MissionfilterComponent implements OnInit {
  @Output() yearSelected = new EventEmitter<string>();
  
  years: string[] = [];
  selectedYear: string = 'all';

  constructor() { }

  ngOnInit(): void {
    this.generateYears();
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = 2006; year <= currentYear; year++) {
      this.years.push(year.toString());
    }
  }

  onYearChange(): void {
    this.yearSelected.emit(this.selectedYear);
  }

  clearFilter(): void {
    this.selectedYear = 'all';
    this.yearSelected.emit('all');
  }
}