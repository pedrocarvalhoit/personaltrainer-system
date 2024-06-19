import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Client {
  id: number;
  photo: string | null;
  fullName: string;
  email: string;
  mobile: string;
  age: string;
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

  saveClient(headers: HttpHeaders, clientData: any): Observable<number> {
    return this.http.post<number>(
      'http://localhost:8088/api/v1/clients/save',
      clientData,
      { headers }
    );
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
}
