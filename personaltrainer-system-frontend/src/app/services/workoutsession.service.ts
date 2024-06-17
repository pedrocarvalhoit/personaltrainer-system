import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from './errohandler/error-handler.service';
import { Observable } from 'rxjs';

interface WorkoutSessionForCalender {
  clientName: string;
  sessionDate: string;
}

interface WorkoutSessionTotalSummaryResponse {
  totalSessionsPerMonth: number;
  bestThreeClients: string[];
  bestThreeClientsNumOfSessions: number[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutsessionService {

  errorMessage: string = '';

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private errorHandlerService: ErrorHandlerService) { }

  getWorkoutSessionsDate(headers: HttpHeaders): Observable<WorkoutSessionForCalender[]> {
    return this.http.get<WorkoutSessionForCalender[]>('http://localhost:8088/api/v1/users/get-workout-sessions', { headers });
  }

  getTotalMonthlyWorkoutSessions(headers: HttpHeaders): Observable<WorkoutSessionTotalSummaryResponse> {
    return this.http.get<WorkoutSessionTotalSummaryResponse>('http://localhost:8088/api/v1/workout-sessions/get-workout-summary', { headers });
  }
}
