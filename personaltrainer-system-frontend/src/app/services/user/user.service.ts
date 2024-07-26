import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { Observable } from 'rxjs';

interface UserDataMenuResponse {
  firstName: string;
  photo: string;
}

interface UserDataResponse {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  mobile: string;
  gender: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getWorkoutSessions(headers: HttpHeaders) {
    throw new Error('Method not implemented.');
  }

  errorMessage: string = '';

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private errorHandlerService: ErrorHandlerService) { }

  getUserDataForMenu(headers: HttpHeaders): Observable<UserDataMenuResponse> {
    return this.http.get<UserDataMenuResponse>('http://localhost:8088/api/v1/users/get-user-data-menu', { headers });
  }

  getUserData(headers: HttpHeaders): Observable<UserDataResponse> {
    return this.http.get<UserDataResponse>('http://localhost:8088/api/v1/users/get-user-data', { headers });
  }

  editData(headers: HttpHeaders, firstName: string, lastName: string, email: string,
    password: string, dateOfBirth: string, mobile: string, gender: string){
    const body = {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      mobile,
      gender
    };
    return this.http.post<any>('http://localhost:8088/api/v1/users/edit', body, { headers });
  }

  updatePhoto(headers: HttpHeaders, formData: FormData): Observable<string> {
    return this.http.patch('http://localhost:8088/api/v1/users/update-photo', formData, { headers, responseType: 'text' });
  }
}
