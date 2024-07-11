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

  //Visible sessions
  sessions: any[] = [];
  selectedDate: string = '';

  //filter sessions
  filteredSessions: any[] = [];

  //Dialog vars
  workoutProgramName: string = '';
  sessionDate: string = '';
  sessionTime: string = '';
  clientSubjectEffort: number | undefined;
  pTQualityEffortIndicative: number | undefined;

  currentSession: any;

  visible: boolean = false;

  constructor(
    private workoutsessionService: WorkoutsessionService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.selectedDate = this.getCurrentDate();
    this.loadTrainingSessions();
  }

  showDialog(session: any){
    this.currentSession = session;
    this.workoutProgramName = session.workoutProgramName;
    this.sessionDate = session.sessionDate;
    this.sessionTime = session.sessionTime;
    this.clientSubjectEffort = session.clientSubjectEffort;
    this.pTQualityEffortIndicative = session.ptqualityEffortIndicative;
    this.visible = true;
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

  updateData(sessionId: number){
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.workoutsessionService.updateData(headers, sessionId, this.workoutProgramName ,this.sessionDate, this.sessionTime,
        this.clientSubjectEffort || 0, this.pTQualityEffortIndicative || 0,

      )
        .subscribe(response => {
          console.log('Session update successfully', response);
          window.location.reload();
        }, error => {
          console.error('Update failed', error);
          console.log('Error details:', error); // Log detalhado do erro
        });
    } else {
      console.error('Token not found');
    }
  }

  deleteSession(sessionId: number){
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.workoutsessionService.deleteSession(headers, sessionId)
        .subscribe(response => {
          console.log('Session deleted successfully', response);
          window.location.reload();
        }, error => {
          console.error('Delete failed', error);
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
      this.filteredSessions = this.sessions.filter(session =>
        session.sessionDate === this.getCurrentDate()
      ); // If filter is empty, show today sessions
    }
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
