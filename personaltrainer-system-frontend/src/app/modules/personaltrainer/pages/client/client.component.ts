import { Component, OnInit } from '@angular/core';
import { Client, ClientService } from '../../../../services/client/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { WorkoutSessionClientMonthlySummaryResponse, WorkoutsessionService } from '../../../../services/workoutsession/workoutsession.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit{

  clientId!: number;
  client!: Client;

  totalSessionsActualMonth: number = 0;
  totalExecutedSessionsActualMonth: number = 0;
  totalNotExecutedSessionsActualMonth: number = 0;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private authService: AuthService,
    private workoutSessionService: WorkoutsessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.clientId = params['id'];
      this.loadClientDetails();
    });

    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      // Fetch workout sessions count and top clients
      this.workoutSessionService.getTotalMonthlySummary(headers, this.clientId).subscribe(
        summary => {
          console.log('Data fecthed', summary)
          this.totalSessionsActualMonth = summary.totalSessionsActualMonth;
          this.totalExecutedSessionsActualMonth = summary.totalExecutedSessionsActualMonth;
          this.totalNotExecutedSessionsActualMonth = summary.totalNotExecutedSessionsActualMonth;
        },
        error => {
          console.error('Failed to fetch workout summary', error);
        }
      );
    } else {
      console.error('Token not found');
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
