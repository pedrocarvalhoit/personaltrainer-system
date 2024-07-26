import { Component, Output } from '@angular/core';
import { WorkoutsessionService } from '../../../../services/workout-session/workoutsession.service';
import { AuthService } from '../../../../services/auth/auth.service';
import {
  Client,
  ClientService,
  PageResponse,
} from '../../../../services/client/client.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { RedirectmessageService } from '../../../../services/redirect-messages/redirectmessage.service';

@Component({
  selector: 'app-create-workoutsession',
  templateUrl: './create-workoutsession.component.html',
  styleUrl: './create-workoutsession.component.scss',
})
export class CreateWorkoutsessionComponent {
  clients: Client[] = [];
  selectedClient: Client | null = null;
  workoutProgramName: string = '';
  sessionDate: string = '';
  sessionTime: string = '';
  clientSubjectEffort: number | undefined;
  pTQualityEffortIndicative: number | undefined;
  executed: boolean = false;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private authService: AuthService,
    private workoutSessionService: WorkoutsessionService,
    private redirectMessageService: RedirectmessageService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.clientService.getAllEnabledClients(headers).subscribe(
        (response: PageResponse<Client>) => {
          this.clients = response.content;
        },
        (error) => {
          console.error('Failed to load enabled clients:', error);
        }
      );
    }
  }

  onSubmit(): void {
    this.saveSession();
  }

  saveSession(): void {
    if (!this.selectedClient) {
      console.error('No client selected.');
      return;
    }
    const token = this.authService.getToken();
    const selectedClientId = this.selectedClient?.id || 0;
    if (token) {
      const headers = new HttpHeaders
      ({
        Authorization: `Bearer ${token}`,
      });

      this.workoutSessionService.save(headers, selectedClientId, this.workoutProgramName, this.sessionDate, this.sessionTime,
        this.clientSubjectEffort || 0, this.pTQualityEffortIndicative || 0, this.executed
      )
        .subscribe(response => {
          this.redirectMessageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Workout Session Created Successfully' });
          this.router.navigate(['personaltrainer']);
        }, error => {
          console.error('Create failed', error);
        });
    } else {
      console.error('Token not found');
    }
  }

  cancel() {
    this.router.navigate(['personaltrainer']);
  }
}
