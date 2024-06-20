import { Component } from '@angular/core';
import { WorkoutsessionService } from '../../../../services/workoutsession/workoutsession.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-workout-session',
  templateUrl: './workout-session.component.html',
  styleUrl: './workout-session.component.scss'
})
export class WorkoutSessionComponent {

  sessions: any[] = [];
  selectedDate: string = '';
  filteredSessions: any[] = [];

  constructor(
    private workoutsessionService: WorkoutsessionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTrainingSessions();
  }

  loadTrainingSessions(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.workoutsessionService.getSessions(headers).subscribe(
        (sessions) => {
          this.sessions = sessions;
          this.filteredSessions = this.sessions;
        },
        (error) => {
          console.error('Failed to load sessions:', error);
        }
      );
    } else {
      console.error('Token not found');
    }
  }

  executeSession(sessionId: number) {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.workoutsessionService.executeSession(sessionId, headers)
        .subscribe(response => {
          console.log('Session executed successfully', response);
          window.location.reload();
        }, error => {
          console.error('Update failed', error);
          console.log('Error details:', error); // Log detalhado do erro
        });
    } else {
      console.error('Token not found');
    }
  }

  filterSessions() {
    if (this.selectedDate) {
      this.filteredSessions = this.sessions.filter(session =>
        session.sessionDate === this.selectedDate
      );
    } else {
      this.filteredSessions = this.sessions; // Se nenhum filtro aplicado, mostrar todas as sessões
    }
  }
}
