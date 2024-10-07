import { Component, OnInit } from '@angular/core';
import {
  Client,
  ClientService,
} from '../../../../services/client/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { RedirectmessageService } from '../../../../services/redirect-messages/redirectmessage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss',
})
export class EditClientComponent implements OnInit {
  clientId!: number;
  client!: Client;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private authService: AuthService,
    private redirectMessageService: RedirectmessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.clientId = params['id'];
      this.loadClientDetails();
    });
  }

  loadClientDetails(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.clientService.getClientById(headers, this.clientId).subscribe(
        (client: Client) => {
          this.client = client;
        },
        (error) => {
          console.error('Failed to load client details:', error);
        }
      );
    }
  }

  onSubmit() {
    const token = this.authService.getToken(); // Obtém o token JWT do serviço AuthService
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.clientService.editData(headers, this.client.id, this.client.firstName, this.client.lastName, this.client.email,
        this.client.dateOfBirth, this.client.mobile, this.client.gender)
        .subscribe(response => {
          this.redirectMessageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Client Data Updated Successfully' });
          this.router.navigate(['personaltrainer/clients']);
        }, error => {
          console.error('Update failed', error);
        });
    } else {
      console.error('Token not found');
    }
  }

  cancel() {
    throw new Error('Method not implemented.');
  }
}
