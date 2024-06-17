import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  saveClient(headers: HttpHeaders, clientData: any): Observable<number> {
    return this.http.post<number>('http://localhost:8088/api/v1/clients/save', clientData, { headers });
  }


}
