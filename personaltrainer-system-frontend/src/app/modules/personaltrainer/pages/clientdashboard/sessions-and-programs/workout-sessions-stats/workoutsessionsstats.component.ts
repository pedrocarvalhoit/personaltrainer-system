import { Component, Input, OnInit } from '@angular/core';
import { Client, ClientService } from '../../../../../../services/client/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { WorkoutsessionService } from '../../../../../../services/workout-session/workoutsession.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-workoutsessionsstats',
  templateUrl: './workoutsessionsstats.component.html',
  styleUrl: './workoutsessionsstats.component.scss'
})
export class WorkoutsessionsstatsComponent implements OnInit{

  @Input() clientId!: number;

  //Monthly Stats
  totalSessionsActualMonth: number = 0;
  totalExecutedSessionsActualMonth: number = 0;
  totalNotExecutedSessionsActualMonth: number = 0;
  percentActualMonthExecuted: number = 0;
  percentActualMonthNotExecuted: number = 0;

  //All Time Stats
  totalAllTimeSessions: number = 0;
  totalAllTimeExecutedSessions: number = 0;
  totalAllTimeNotExecutedSessions: number = 0;
  percentAllTimeExecuted: number = 0;
  percentAllTimeNotExecuted: number = 0;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private authService: AuthService,
    private workoutSessionService: WorkoutsessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.clientId && !isNaN(this.clientId)) {
      const token = this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      //Monthly stats
      this.workoutSessionService.getMonthlyStatsSummary(headers, this.clientId).subscribe(
        summary => {
          console.log('Data fecthed', summary)
          this.totalSessionsActualMonth = summary.totalSessionsActualMonth;
          this.totalExecutedSessionsActualMonth = summary.totalExecutedSessionsActualMonth;
          this.totalNotExecutedSessionsActualMonth = summary.totalNotExecutedSessionsActualMonth;
          this.percentActualMonthExecuted = summary.percentExecuted;
          this.percentActualMonthNotExecuted = summary.percentNotExecuted
        },
        error => {
          console.error('Failed to fetch workout summary', error);
        }
      );
    //All time stats
    this.workoutSessionService.getAllTimeStatsSummary(headers, this.clientId).subscribe(
      summary => {
        console.log('Data fecthed', summary)
        this.totalAllTimeSessions = summary.totalSessions;
        this.totalAllTimeExecutedSessions = summary.totalExecutedSessions;
        this.totalAllTimeNotExecutedSessions = summary.totalNotExecutedSessions;
        this.percentAllTimeExecuted = summary.percentExecuted;
        this.percentAllTimeNotExecuted = summary.percentNotExecuted
      },
      error => {
        console.error('Failed to fetch workout summary', error);
      }
    );
    } else {
      console.error('Token not found');
    }
  }
  }

}
