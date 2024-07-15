import { Component, OnInit } from '@angular/core';
import { ClientService, Client, PageResponse } from '../../../../services/client/client.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RedirectmessageService } from '../../../../services/redirectmessages/redirectmessage.service';

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

  // Dialog vars
  visible: boolean = false;
  currentClient: Client | null = null;
  clientPhoto: string = '';

  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private clientService: ClientService,
    private messageService: MessageService,
    private redirectMessageService: RedirectmessageService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    const messages = this.redirectMessageService.getMessages();
    if (messages.length > 0) {
      this.messageService.addAll(messages);
      this.redirectMessageService.clearMessages();
    }
  }

  showDialog(client: Client) {
    this.currentClient = client;
    this.visible = true;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  updatePhoto() {
    if (!this.currentClient) {
      console.error('No client selected');
      return;
    }

    const token = this.authService.getToken();
    if (this.selectedFile && token) {
      const formData = new FormData();
      formData.append('file', this.selectedFile as File);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.clientService.updatePhoto(headers, formData, this.currentClient.id).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Photo updated successfully' });
          this.visible = false;

          // Atualiza a foto do cliente na lista sem recarregar toda a lista
          const clientIndex = this.clients.findIndex(client => client.id === this.currentClient!.id);
          if (clientIndex !== -1) {
            this.clients[clientIndex].photo = response;
          }
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
