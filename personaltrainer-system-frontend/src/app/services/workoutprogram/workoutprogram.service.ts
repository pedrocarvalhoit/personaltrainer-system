import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from '../errohandler/error-handler.service';
import { Observable, catchError } from 'rxjs';

export interface WorkoutProgram {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  trainingSessionContent: string;
  note: string;
  enabled: boolean;
}

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutprogramService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private errorHandlerService: ErrorHandlerService) { }

  save(headers: HttpHeaders, selectedClientid: number, title: string, inicialDate: string, endDate: string,
    trainingSessionContent: string, note: string, enabled: boolean) {
      const body = {
        selectedClientid,
        title,
        inicialDate,
        endDate,
        trainingSessionContent,
        note,
        enabled
      };
    return this.http.post<any>(`http://localhost:8088/api/v1/workout-programs/create/${selectedClientid}`, body , { headers });
  }

  getAllEnabledPrograms(headers: HttpHeaders, clientId: number, page: number = 0, size: number = 50): Observable<PageResponse<WorkoutProgram>> {
    return this.http.get<PageResponse<WorkoutProgram>>(
      `http://localhost:8088/api/v1/workout-programs/enabled/${clientId}`,
      { headers, params: { page: page.toString(), size: size.toString() } }
    );
  }

  getAllDisabledPrograms(headers: HttpHeaders, clientId: number, page: number = 0, size: number = 50): Observable<PageResponse<WorkoutProgram>> {
    return this.http.get<PageResponse<WorkoutProgram>>(
      `http://localhost:8088/api/v1/workout-programs/disabled/${clientId}`,
      { headers, params: { page: page.toString(), size: size.toString() } }
    );
  }

  exportToPdf(headers: HttpHeaders, programId: number): Observable<Blob> {
    return this.http.get(`http://localhost:8088/api/v1/workout-programs/export-pdf/${programId}`, { headers, responseType: 'blob'}).pipe(
      catchError((error: any) => {
        console.error('Download PDF failed', error);
        throw error;
      })
    );
  }


}
