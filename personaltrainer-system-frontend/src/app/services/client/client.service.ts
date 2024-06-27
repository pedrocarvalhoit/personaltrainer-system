import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Client {
  id: number;
  photo: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  age: string;
  gender: string;
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
  providedIn: 'root',
})
export class ClientService {

  constructor(private http: HttpClient) {}

  getClientById(headers: HttpHeaders, clientId: number): Observable<Client> {
    return this.http.get<Client>(`http://localhost:8088/api/v1/clients/${clientId}`, { headers });
  }

  saveClient(headers: HttpHeaders, formData: FormData): Observable<number> {
    return this.http.post<number>(
      'http://localhost:8088/api/v1/clients/save',
      formData,
      { headers }
    );
  }

  updatePhoto(headers: HttpHeaders, formData: FormData, clientId: number): Observable<number> {
    return this.http.patch<number>(`http://localhost:8088/api/v1/clients/update-photo/${clientId}`, formData, { headers });
  }

  getAllEnabledClients(
    headers: HttpHeaders,
    page: number = 0,
    size: number = 50
  ): Observable<PageResponse<Client>> {
    return this.http.get<PageResponse<Client>>(
      'http://localhost:8088/api/v1/clients/all-enabled',
      { headers, params: { page: page.toString(), size: size.toString() } }
    );
  }

  getAllDisabledClients(
    headers: HttpHeaders,
    page: number = 0,
    size: number = 50
  ): Observable<PageResponse<Client>> {
    return this.http.get<PageResponse<Client>>(
      'http://localhost:8088/api/v1/clients/all-disabled',
      { headers, params: { page: page.toString(), size: size.toString() } }
    );
  }

  editData(headers: HttpHeaders, clientId: number, firstName: string, lastName: string, email: string,
    dateOfBirth: string, mobile: string, gender: string){
    const body = {
      personalData:{
      firstName,
      lastName,
      email,
      dateOfBirth,
      mobile,
      gender
      }
    };
    return this.http.patch<any>(`http://localhost:8088/api/v1/clients/update/${clientId}`, body, { headers });
  }

  changeStatus(headers: HttpHeaders, clientId: number): Observable<Client> {
    return this.http.patch<Client>(`http://localhost:8088/api/v1/clients/update-status/${clientId}`,{},{ headers });
  }

}
