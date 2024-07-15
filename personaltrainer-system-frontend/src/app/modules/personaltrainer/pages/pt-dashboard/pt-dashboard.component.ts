import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import {
  WorkoutSessionResponseForCalendar,
  WorkoutsessionService,
} from '../../../../services/workoutsession/workoutsession.service';
import { CreateWorkoutsessionComponent } from '../create-workout-session/create-workoutsession.component';
import { RedirectmessageService } from '../../../../services/redirectmessages/redirectmessage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pt-dashboard',
  templateUrl: './pt-dashboard.component.html',
  styleUrl: './pt-dashboard.component.scss',
})
export class PtDashboardComponent implements OnInit {
  totalSessionsPerMonth: number = 0;
  totalExecutedSessionsPerMonth: number = 0;
  totalNotExecutedSessionsPerMonth: number = 0;
  firstPlaceClient: string = 'Client 1';
  secondPlaceClient: string = 'Client 2';
  thirdPlaceClient: string = 'Client 3';

  firstPlaceSessions: number = 1;
  secondPlaceSessions: number = 2;
  thirdPlaceSessions: number = 3;

  upcomingSessions: WorkoutSessionResponseForCalendar[] = [];

  constructor(
    private authService: AuthService,
    private workoutSessionService: WorkoutsessionService,
    private redirectMessageService: RedirectmessageService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken(); // Obtém o token JWT do serviço AuthService
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      // Fetch workout sessions count and top clients
      this.workoutSessionService.getUpcomingSessions(headers).subscribe(
        (data: WorkoutSessionResponseForCalendar[]) => {
          this.upcomingSessions = data;
        },
        (error) => {
          console.error('Failed to load upcoming sessions:', error);
        }
      );
      //Messages
      const messages = this.redirectMessageService.getMessages();
      if (messages.length > 0) {
        this.messageService.addAll(messages);
        this.redirectMessageService.clearMessages();
      }
      this.workoutSessionService
        .getTotalMonthlyWorkoutSessions(headers)
        .subscribe(
          (summary) => {
            console.log('Data fecthed', summary);
            this.totalSessionsPerMonth = summary.totalSessionsPerMonth;
            this.totalExecutedSessionsPerMonth =
              summary.totalExecutedSessionsPerMonth;
            this.totalNotExecutedSessionsPerMonth =
              summary.totalNotExecutedSessionsPerMonth;
            this.firstPlaceClient = summary.bestThreeClients[0] || 'N/A';
            this.secondPlaceClient = summary.bestThreeClients[1] || 'N/A';
            this.thirdPlaceClient = summary.bestThreeClients[2] || 'N/A';

            this.firstPlaceSessions = summary.bestThreeClientsNumOfSessions[0];
            this.secondPlaceSessions = summary.bestThreeClientsNumOfSessions[1];
            this.thirdPlaceSessions = summary.bestThreeClientsNumOfSessions[2];
          },
          (error) => {
            console.error('Failed to fetch workout summary', error);
          }
        );
    } else {
      console.error('Token not found');
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
