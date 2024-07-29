import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { catchError, Observable, tap, throwError } from 'rxjs';

  export interface CooperTestDescription {
    description: string;
  }

  export interface CooperTestHistoricResponse {
    month: string,
    result: number;
  }

@Injectable({
  providedIn: 'root'
})
export class CooperTestService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private errorHandlerService: ErrorHandlerService) { }

  save(headers: HttpHeaders, selectedClientid: number, distance: number) {
      const body = {
        distance
      };
    return this.http.post<any>(`http://localhost:8088/api/v1/cooper-test/create/${selectedClientid}`, body , { headers });
  }

  getTestDescription(headers: HttpHeaders): Observable<CooperTestDescription> {
    return this.http.get<CooperTestDescription>('http://localhost:8088/api/v1/cooper-test/description', { headers });
  }

  getCooperTestHistoric(headers: HttpHeaders, clientId: number): Observable<CooperTestHistoricResponse[]> {
    return this.http.get<CooperTestHistoricResponse[]>(`http://localhost:8088/api/v1/cooper-test/historic/${clientId}`, { headers })
      .pipe(
        tap(response => console.log('Raw API Response:', response)),
        catchError(error => {
          console.error('Error fetching sessions quality:', error);
          return throwError(error);
        })
      );
  }

}
