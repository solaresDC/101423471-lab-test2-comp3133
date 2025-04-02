import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SpacexService } from '../../services/spacex.service';
import { Mission } from '../../models/mission.model';
import { MissionfilterComponent } from '../missionfilter/missionfilter.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MissionfilterComponent,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private spacexService: SpacexService) { }

  ngOnInit(): void {
    this.getMissions();
  }

  getMissions(): void {
    this.loading = true;
    this.spacexService.getAllLaunches().subscribe({
      next: (data) => {
        this.missions = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading missions. Please try again later.';
        this.loading = false;
        console.error('Error fetching missions:', error);
      }
    });
  }

  filterMissionsByYear(year: string): void {
    this.loading = true;
    if (year === 'all') {
      this.getMissions();
      return;
    }
    
    this.spacexService.getLaunchesByYear(year).subscribe({
      next: (data) => {
        this.missions = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error filtering missions. Please try again later.';
        this.loading = false;
        console.error('Error filtering missions:', error);
      }
    });
  }
}