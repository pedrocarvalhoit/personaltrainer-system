import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, ClientService } from '../../../../services/client/client.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { WorkoutsessionService } from '../../../../services/workout-session/workoutsession.service';
import { HttpHeaders } from '@angular/common/http';
import { Message, MessageService } from 'primeng/api';
import { RedirectmessageService } from '../../../../services/redirect-messages/redirectmessage.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-client',
  templateUrl: './clientdashboard.component.html',
  styleUrl: './clientdashboard.component.scss'
})
export class ClientDashboardComponent implements OnInit {

  clientId!: number;
  client!: Client;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private authService: AuthService,
    private redirectMessageService: RedirectmessageService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.clientId = +params['id']; // Converte o id para número
      if (!isNaN(this.clientId)) {
        this.loadClientDetails();
      } else {
        console.error('Invalid client ID');
      }
    });
    //Messages
    const messages = this.redirectMessageService.getMessages();
    if (messages.length > 0) {
      this.messageService.addAll(messages);
      this.redirectMessageService.clearMessages();
    }
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

}
