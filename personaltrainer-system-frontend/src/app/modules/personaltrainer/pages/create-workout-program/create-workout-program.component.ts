import { WorkoutprogramService } from '../../../../services/workout-program/workoutprogram.service';
import { Component } from '@angular/core';
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
  selector: 'app-create-workout-program',
  templateUrl: './create-workout-program.component.html',
  styleUrl: './create-workout-program.component.scss',
})
export class CreateWorkoutProgramComponent {
  clients: Client[] = [];
  selectedClient: Client | null = null;
  title: string = '';
  inicialDate: string = '';
  endDate: string = '';
  trainingSessionContent: string = '';
  note: string = '';
  enabled: boolean = true;

  tinyMceConfig: any = {
    height: 300,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
    ],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help',
  };

  constructor(
    private router: Router,
    private clientService: ClientService,
    private authService: AuthService,
    private wokoutProgramService: WorkoutprogramService,
    private redirectMessageService: RedirectmessageService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  onSubmit(): void {
    this.saveProgram();
  }

  saveProgram(): void {
    if (!this.selectedClient) {
      console.error('No client selected.');
      return;
    }
    const token = this.authService.getToken();
    const selectedClientId = this.selectedClient?.id || 0;
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.wokoutProgramService
        .save(
          headers,
          selectedClientId,
          this.title,
          this.inicialDate,
          this.endDate,
          this.trainingSessionContent,
          this.note,
          this.enabled
        )
        .subscribe(
          (response) => {
            const messages = this.redirectMessageService.getMessages();
            this.redirectMessageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Workout Program Created Successfully' });
            this.router.navigate(['personaltrainer']);
          },
          (error) => {
            console.error('Create failed', error);
          }
        );
    } else {
      console.error('Token not found');
    }
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
}
