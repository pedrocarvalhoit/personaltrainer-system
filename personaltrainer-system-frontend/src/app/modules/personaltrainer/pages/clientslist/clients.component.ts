import { Component, OnInit } from '@angular/core';
import { ClientService, Client, PageResponse } from './../../../../services/client/client.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  currentPage: number = 0;
  pageSize: number = 30;
  totalElements: number = 0;

  showDisabledClients = false;

  //Dialog vars
  visible: boolean = false;
  currentClient: any;
  clientPhoto: string = '';

  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private clientService: ClientService,
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  showDialog(client: any){
    this.currentClient = client;
    this.clientPhoto = client.photo;
    this.visible = true;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  updatePhoto(clientId: number){
    const token = this.authService.getToken();

    if (this.clientPhoto && token) {
      const formData = new FormData();
      formData.append('file', this.selectedFile as File);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.clientService.updatePhoto(headers, formData, clientId).subscribe(
        response => {
          console.log('Client update successfuly:', response);
          window.location.reload();
        },
        error => {
          console.error('Error on update client photo:', error);
        }
      );
    } else {
      console.log('Invalid form');
    }
  }

  showSuccessMessage(): void {
    // Exibe a mensagem de sucesso
    const successMessageElement = document.getElementById('success-message');
    if (successMessageElement) {
      successMessageElement.style.display = 'block';
    }
  }

  loadClients(page: number = 0): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      const clientObservable = this.showDisabledClients
        ? this.clientService.getAllDisabledClients(headers, page, this.pageSize)
        : this.clientService.getAllEnabledClients(headers, page, this.pageSize);

      clientObservable.subscribe(
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

  changeStatus(clientId: number): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.clientService.changeStatus(headers, clientId).subscribe(
        response => {
          console.log('Client status updated successfully:', response);
          window.location.reload();
        },
        error => {
          console.error('Failed to update client status:', error);
        }
      );
    } else {
      console.error('Token not found');
    }
  }

  toggleClientList() {
    this.showDisabledClients = !this.showDisabledClients;
    this.loadClients();
  }

  editClient(clientId: number): void {
    this.router.navigate(['personaltrainer/edit-client', clientId]);
  }

  redirectClientPage(clientId: number): void {
    this.router.navigate(['personaltrainer/client-dashboard', clientId]);
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

