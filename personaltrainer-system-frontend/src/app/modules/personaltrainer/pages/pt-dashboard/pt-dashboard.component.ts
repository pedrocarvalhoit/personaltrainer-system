import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserService } from '../../../../services/user/user.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { WorkoutsessionService } from '../../../../services/workoutsession.service';

@Component({
  selector: 'app-pt-dashboard',
  templateUrl: './pt-dashboard.component.html',
  styleUrl: './pt-dashboard.component.scss'
})
export class PtDashboardComponent implements OnInit {

 /* calendarPlugins = [dayGridPlugin, interactionPlugin];
  calendarEvents = [];*/
  workoutSessionsCount: number = 0;
  firstPlaceClient: string = 'Client 1';
  secondPlaceClient: string = 'Client 2';
  thirdPlaceClient: string = 'Client 3';

  constructor(private authService: AuthService, private workoutSessionService: WorkoutsessionService, private router: Router) {}

  ngOnInit(): void {
    const token = this.authService.getToken(); // Obtém o token JWT do serviço AuthService
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // Fetch calendar events
    /*  this.workoutSessionService.getWorkoutSessions(headers).subscribe(
        events => {
          this.calendarEvents = events;
        },
        error => {
          console.error('Failed to fetch calendar events', error);
        }
      );*/

      // Fetch workout sessions count and top clients
      this.workoutSessionService.getTotalMonthlyWorkoutSessions(headers).subscribe(
        summary => {
          this.workoutSessionsCount = summary.totalSessions;
          this.firstPlaceClient = summary.topClients[0]?.name || 'N/A';
          this.secondPlaceClient = summary.topClients[1]?.name || 'N/A';
          this.thirdPlaceClient = summary.topClients[2]?.name || 'N/A';
        },
        error => {
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

  createClient() {
    this.router.navigate(['personaltrainer/create-client']);
  }
}
