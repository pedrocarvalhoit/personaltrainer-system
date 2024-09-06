import { Component } from '@angular/core';
import { Client, ClientService, PageResponse } from '../../../../services/client/client.service';
import { Router } from '@angular/router';
import { CooperTestService } from '../../../../services/cooper-test/cooper-test.service';
import { InicialAssessmentService } from '../../../../services/inicial-assessment/inicial-assessment.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { RedirectmessageService } from '../../../../services/redirect-messages/redirectmessage.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-initial-assessment',
  templateUrl: './create-initial-assessment.component.html',
  styleUrl: './create-initial-assessment.component.scss'
})
export class CreateInitialAssessmentComponent {

  clients: Client[] = [];
  selectedClient: Client | null = null;
  restingHeartRate: number | undefined;
  maxHeartRate: number | undefined;
  sistolicBloodPressure: number | undefined;
  diastolicBloodPressure: number | undefined;

  constructor(
    private router: Router,
    private inicialAssessmentService: InicialAssessmentService,
    private authService: AuthService,
    private clientService: ClientService,
    private redirectMessageService: RedirectmessageService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  saveAssessment(): void {
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

      this.inicialAssessmentService
        .save(
          headers,
          selectedClientId,
          this.restingHeartRate || 0,
          this.maxHeartRate || 0,
          this.sistolicBloodPressure || 0,
          this.diastolicBloodPressure || 0
        )
        .subscribe(
          (response) => {
            const messages = this.redirectMessageService.getMessages();
            this.redirectMessageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Inicial Assessment Created Successfully' });
            this.router.navigate([`personaltrainer/client-dashboard/${this.selectedClient?.id}`]);
          },
          (error) => {
            console.error('Create failed', error);
          }
        );
    } else {
      console.error('Token not found');
    }
  }

  onSubmit(): void {
    this.saveAssessment();
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
