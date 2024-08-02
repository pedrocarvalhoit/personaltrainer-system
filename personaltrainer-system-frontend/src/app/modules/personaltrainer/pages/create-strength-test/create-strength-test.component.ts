import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../services/auth/auth.service';
import { Client, ClientService, PageResponse } from '../../../../services/client/client.service';
import { StrengthTestService, ExercisesResponse, TestDescriptionResponse, Exercise } from '../../../../services/strength-test/strength-test.service';
import { RedirectmessageService } from '../../../../services/redirect-messages/redirectmessage.service';

@Component({
  selector: 'app-create-strength-test',
  templateUrl: './create-strength-test.component.html',
  styleUrls: ['./create-strength-test.component.scss']
})
export class CreateStrengthTestComponent implements OnInit {

  clients: Client[] = [];
  selectedClient: Client | null = null;

  exercises: Exercise[] = [];

  maxLoad: number | undefined;
  description: string = '';
  selectedExercise: Exercise | undefined;

  constructor(
    private router: Router,
    private strengthTestService: StrengthTestService,
    private authService: AuthService,
    private clientService: ClientService,
    private redirectMessageService: RedirectmessageService
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadExercises();
    this.loadDescription();
  }

  onSubmit(): void {
    this.saveTest();
  }

  saveTest(): void {
    if (!this.selectedClient) {
      console.error('No client selected.');
      return;
    }
    if (!this.selectedExercise) {
      console.error('No exercise selected.');
      return;
    }
    const token = this.authService.getToken();
    const selectedClientId = this.selectedClient.id;
    const selectedExercise = this.selectedExercise;
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.strengthTestService
        .save(headers, selectedClientId, this.maxLoad || 0, selectedExercise)
        .subscribe(
          (response) => {
            this.redirectMessageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Strength Test Created Successfully' });
            this.router.navigate([`personaltrainer/client-dashboard/${selectedClientId}`]);
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

  loadExercises(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.strengthTestService.getTestExercises(headers).subscribe(
        (response: ExercisesResponse) => {
          this.exercises = response.exercises as Exercise[];
          console.log('Exercises loaded:', this.exercises);
        },
        (error) => {
          console.error('Failed to load exercises:', error);
        }
      );
    }
  }

  loadDescription(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.strengthTestService.getTestDescription(headers).subscribe(
        (response: TestDescriptionResponse) => {
          this.description = response.description;
        },
        (error) => {
          console.error('Failed to load description:', error);
        }
      );
    }
  }
}
