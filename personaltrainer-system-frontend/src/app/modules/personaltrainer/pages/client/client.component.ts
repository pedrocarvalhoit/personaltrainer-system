import { Component, OnInit } from '@angular/core';
import { Client, ClientService } from '../../../../services/client/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit{
  clientId!: number;
  client!: Client;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private authService: AuthService,
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


}
