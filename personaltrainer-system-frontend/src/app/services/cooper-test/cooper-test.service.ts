import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { Observable } from 'rxjs';

  export interface CooperTestDescription {
    description: string;
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

}
