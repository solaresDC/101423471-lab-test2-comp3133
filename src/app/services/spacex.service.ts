// src/app/services/spacex.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission.model';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  private baseUrl = 'https://api.spacexdata.com/v3';

  constructor(private http: HttpClient) { }

  getAllLaunches(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.baseUrl}/launches`);
  }

  getLaunchById(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.baseUrl}/launches/${id}`);
  }

  getLaunchesByYear(year: string): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.baseUrl}/launches?launch_year=${year}`);
  }
}