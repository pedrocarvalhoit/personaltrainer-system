import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from '../errohandler/error-handler.service';
import { Observable } from 'rxjs';

export interface WorkoutSessionResponseForCalendar {
  clientName: string;
  sessionDate: string;
  sessionTime: string;
}

interface WorkoutSessionTotalSummaryResponse {
  totalSessionsPerMonth: number;
  totalExecutedSessionsPerMonth: number;
  totalNotExecutedSessionsPerMonth: number;
  bestThreeClients: string[];
  bestThreeClientsNumOfSessions: number[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutsessionService {


  errorMessage: string = '';

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private errorHandlerService: ErrorHandlerService) { }

  getUpcomingSessions(headers: HttpHeaders): Observable<WorkoutSessionResponseForCalendar[]> {
    return this.http.get<WorkoutSessionResponseForCalendar[]>('http://localhost:8088/api/v1/workout-sessions/get-upcoming-sessions', { headers });
  }

  getTotalMonthlyWorkoutSessions(headers: HttpHeaders): Observable<WorkoutSessionTotalSummaryResponse> {
    return this.http.get<WorkoutSessionTotalSummaryResponse>('http://localhost:8088/api/v1/workout-sessions/get-workout-summary', { headers });
  }
}
