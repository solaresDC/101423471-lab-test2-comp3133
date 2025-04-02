import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SpacexService } from '../../services/spacex.service';
import { Mission } from '../../models/mission.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ]
})
export class MissiondetailsComponent implements OnInit {
  mission: Mission | null = null;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private spacexService: SpacexService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMissionDetails();
  }

  getMissionDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    
    this.spacexService.getLaunchById(id).subscribe({
      next: (data) => {
        this.mission = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading mission details. Please try again later.';
        this.loading = false;
        console.error('Error fetching mission details:', error);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}