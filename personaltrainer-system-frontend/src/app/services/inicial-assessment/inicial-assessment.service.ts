import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class InicialAssessmentService {

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private errorHandlerService: ErrorHandlerService) {}

  save(headers: HttpHeaders, selectedClientid: number, restingHeartRate: number, maxHeartRate: number, sistolicBloodPressure: number,
    diastolicBloodPressure: number
  ) {
    const body = {
      restingHeartRate,
      maxHeartRate,
      sistolicBloodPressure,
      diastolicBloodPressure
    };
  return this.http.post<any>(`http://localhost:8088/api/v1/inicial-assessment/create/${selectedClientid}`, body , { headers });
}

}
