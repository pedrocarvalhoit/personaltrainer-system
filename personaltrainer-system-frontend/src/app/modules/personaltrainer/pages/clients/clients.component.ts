import { Client, PageResponse} from './../../../../services/client/client.service';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../services/client/client.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit{

  clients: Client[] = [];
  currentPage: number = 0;
  pageSize: number = 30;
  totalElements: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }


  loadClients(page: number = 0): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.clientService.getAllEnabledClients(headers, page, this.pageSize).subscribe(
        (response: PageResponse<Client>) => {
          this.clients = response.content;
          this.currentPage = response.pageNumber;
          this.totalElements = response.totalElements;
        },
        (error) => {
          console.error('Failed to load clients:', error);
        }
      );
    } else {
      console.error('Token not found');
    }
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.totalElements) {
      this.loadClients(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.loadClients(this.currentPage - 1);
    }
  }

}
