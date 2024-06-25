import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadPhotoService {

  private baseUrl = 'http://localhost:8088/api/v1'; // Substitua pelo URL da sua API

  constructor(private http: HttpClient) { }

  uploadProfilePicture(headers: HttpHeaders,clientId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/clients/photo/${clientId}`, formData, { headers });
  }
}
