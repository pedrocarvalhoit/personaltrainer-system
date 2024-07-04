import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client, ClientService } from '../../../../services/client/client.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { WorkoutsessionService } from '../../../../services/workoutsession/workoutsession.service';
import { HttpHeaders } from '@angular/common/http';

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
    private workoutSessionService: WorkoutsessionService,
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
