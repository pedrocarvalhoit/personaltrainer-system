import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CooperTestDescription, CooperTestService } from '../../../../services/cooper-test/cooper-test.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { RedirectmessageService } from '../../../../services/redirect-messages/redirectmessage.service';
import { Client, ClientService, PageResponse } from '../../../../services/client/client.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-cooper-test',
  templateUrl: './create-cooper-test.component.html',
  styleUrl: './create-cooper-test.component.scss'
})
export class CreateCooperTestComponent {

  clients: Client[] = [];
  selectedClient: Client | null = null;
  distance: number | undefined;
  description: string = '';

  constructor(
    private router: Router,
    private cooperTestService: CooperTestService,
    private authService: AuthService,
    private clientService: ClientService,
    private redirectMessageService: RedirectmessageService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadDescription();
  }

  saveTest(): void {
    if (!this.selectedClient) {
      console.error('No client selected.');
      return;
    }
    const token = this.authService.getToken();
    const selectedClientId = this.selectedClient?.id || 0;
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.cooperTestService
        .save(
          headers,
          selectedClientId,
          this.distance || 0
        )
        .subscribe(
          (response) => {
            const messages = this.redirectMessageService.getMessages();
            this.redirectMessageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Cooper Test Created Successfully' });
            this.router.navigate([`personaltrainer/client-dashboard/${this.selectedClient?.id}`]);
          },
          (error) => {
            console.error('Create failed', error);
          }
        );
    } else {
      console.error('Token not found');
    }
  }

  onSubmit(): void {
    this.saveTest();
  }

  loadClients(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.clientService.getAllEnabledClients(headers).subscribe(
        (response: PageResponse<Client>) => {
          this.clients = response.content;
        },
        (error) => {
          console.error('Failed to load enabled clients:', error);
        }
      );
    }
  }

  loadDescription(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.cooperTestService.getTestDescription(headers).subscribe(
        (response: CooperTestDescription) => {
          this.description = response.description;
        },
        (error) => {
          console.error('Failed to load description:', error);
        }
      );
    }
  }

}
