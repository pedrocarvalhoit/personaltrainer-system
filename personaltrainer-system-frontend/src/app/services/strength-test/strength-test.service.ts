import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

export interface TestDescriptionResponse {
  description: string;
}

export interface ExercisesResponse {
  exercises: string[];
}

export enum Exercise {
  BACK_SQUAT = 'BACK_SQUAT',
  BENCH_PRESS = 'BENCH_PRESS',
  DEADLIFT = 'DEADLIFT',
  SEATED_LOW_ROW = 'SEATED_LOW_ROW',
}

export interface ExerciseStatsResponse {
  month: string;
  maxLoadAvarage: number;
  maxLoad: number;
  max1Rm: number;
}

@Injectable({
  providedIn: 'root'
})
export class StrengthTestService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private errorHandlerService: ErrorHandlerService) { }

  save(headers: HttpHeaders, selectedClientid: number, maxLoad: number, selectedExercise: Exercise) {
    const body = {
      maxLoad,
      exercise: selectedExercise
    };
    console.log('Request body:', body);
  return this.http.post<any>(`http://localhost:8088/api/v1/strength-test/create/${selectedClientid}`, body , { headers });
}

  getTestDescription(headers: HttpHeaders): Observable<TestDescriptionResponse> {
    return this.http.get<TestDescriptionResponse>('http://localhost:8088/api/v1/strength-test/description', { headers });
  }

  getTestExercises(headers: HttpHeaders): Observable<ExercisesResponse> {
    return this.http.get<ExercisesResponse>('http://localhost:8088/api/v1/strength-test/exercises', { headers });
  }

  getBackSquatStats(headers: HttpHeaders, clientId: number): Observable<ExerciseStatsResponse[]> {
    return this.http.get<ExerciseStatsResponse[]>(`http://localhost:8088/api/v1/strength-test/get-back-squat-stats/${clientId}`, { headers })
      .pipe(
        tap(response => console.log('Raw API Response:', response)),
        catchError(error => {
          console.error('Error fetching sessions quality:', error);
          return throwError(error);
        })
      );
  }

  getDeadliftStats(headers: HttpHeaders, clientId: number): Observable<ExerciseStatsResponse[]> {
    return this.http.get<ExerciseStatsResponse[]>(`http://localhost:8088/api/v1/strength-test/get-deadlift-stats/${clientId}`, { headers })
      .pipe(
        tap(response => console.log('Raw API Response:', response)),
        catchError(error => {
          console.error('Error fetching sessions quality:', error);
          return throwError(error);
        })
      );
  }


}
