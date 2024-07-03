import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from '../errohandler/error-handler.service';
import { Observable } from 'rxjs';

export interface WorkoutSessionResponse {
  id: number;
  clientName: string;
  sessionDate: string;
  sessionTime: string;
  clientSubjectEffort: number;
  ptqualityEffortIndicative: number;
  executed: boolean;
}


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

export interface WorkoutSessionClientActualMonthSummaryResponse {
  totalSessionsActualMonth: number;
  totalExecutedSessionsActualMonth: number;
  totalNotExecutedSessionsActualMonth: number;
  percentExecuted: number;
  percentNotExecuted: number;
}

export interface WorkoutSessionClientAllTimeSummaryResponse{
  totalSessions: number;
  totalExecutedSessions: number;
  totalNotExecutedSessions: number;
  percentExecuted: number;
  percentNotExecuted: number;
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

  getSessions(headers: HttpHeaders): Observable<WorkoutSessionResponse[]> {
    return this.http.get<WorkoutSessionResponse[]>('http://localhost:8088/api/v1/workout-sessions/get-workout-calendar', { headers });
  }

  executeSession(sessionId: number, headers: HttpHeaders) {
    return this.http.patch<any>(`http://localhost:8088/api/v1/workout-sessions/execute/${sessionId}`,{}, { headers });
  }

  save(headers: HttpHeaders, selectedClientid: number, workoutProgramName: string, sessionDate: string, sessionTime: string,
    clientSubjectEffort: number, pTQualityEffortIndicative: number, executed: boolean) {
      const body = {
        selectedClientid,
        workoutProgramName,
        sessionDate,
        sessionTime,
        clientSubjectEffort,
        pTQualityEffortIndicative,
        executed
      };
    return this.http.post<any>(`http://localhost:8088/api/v1/workout-sessions/create/${selectedClientid}`, body , { headers });
  }

  updateEfforts(headers: HttpHeaders, selectedClientid: number, clientSubjectEffort: number, pTQualityEffortIndicative: number) {
      const body = {
        selectedClientid,
        clientSubjectEffort,
        pTQualityEffortIndicative,
      };
    return this.http.patch<any>(`http://localhost:8088/api/v1/workout-sessions/update-efforts/${selectedClientid}`, body , { headers });
  }

  deleteSession( headers: HttpHeaders, sessionId: number) {
    return this.http.delete<any>(`http://localhost:8088/api/v1/workout-sessions/delete/${sessionId}`, { headers });
  }

  //Client dashboard
  getMonthlyStatsSummary(headers: HttpHeaders, sessionId: number): Observable<WorkoutSessionClientActualMonthSummaryResponse> {
    return this.http.get<WorkoutSessionClientActualMonthSummaryResponse>
    (`http://localhost:8088/api/v1/workout-sessions/get-workout-stats-actual-month/${sessionId}`, { headers });
  }

  getAllTimeStatsSummary(headers: HttpHeaders, sessionId: number): Observable<WorkoutSessionClientAllTimeSummaryResponse> {
    return this.http.get<WorkoutSessionClientAllTimeSummaryResponse>
    (`http://localhost:8088/api/v1/workout-sessions/get-workout-stats-all-time/${sessionId}`, { headers });
  }

}
