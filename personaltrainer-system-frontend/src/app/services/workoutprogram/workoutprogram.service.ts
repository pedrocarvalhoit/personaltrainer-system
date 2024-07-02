import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from '../errohandler/error-handler.service';

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
}
