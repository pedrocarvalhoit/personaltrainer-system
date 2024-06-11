import { ErrorHandlerService } from './../errohandler/error-handler.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError } from 'rxjs';

export const TOKEN_NAME: string = 'jwt_token';

interface UserNameResponse {
  firstName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorMessage: string = '';

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private errorHandlerService: ErrorHandlerService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:8088/api/v1/auth/authenticate', {email, password});
  }

  register(firstName: string, lastName: string, email: string, password: string){
    return this.http.post<any>('http://localhost:8088/api/v1/auth/register', {firstName, lastName, email, password});
  }

  verify(token: string): Observable<any> {
    const url = `http://localhost:8088/api/v1/auth/activate-account?token=${token}`;
    return this.http.get<any>(url);
  }

  getUserName(headers: HttpHeaders): Observable<UserNameResponse> {
    return this.http.get<UserNameResponse>('http://localhost:8088/api/v1/users/get-user-name', { headers });
  }

  public isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      const token = localStorage.getItem(TOKEN_NAME);
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  public setToken(token: string): void {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      localStorage.setItem(TOKEN_NAME, token);
    }
  }

  public getToken(): string {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      return localStorage.getItem(TOKEN_NAME) || '';
    }
    return '';
  }

  public logout(): void {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      localStorage.removeItem(TOKEN_NAME);
    }
  }
}
