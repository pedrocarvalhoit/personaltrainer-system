import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { WorkoutSessionQualityResponse, WorkoutsessionService } from '../../../../../services/workoutsession/workoutsession.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-trainingindicativestats',
  templateUrl: './trainingindicativestats.component.html',
  styleUrl: './trainingindicativestats.component.scss',
})
export class TrainingindicativestatsComponent implements OnInit, OnChanges {

  @Input() clientId!: number;
  data: any;
  options: any;

  constructor(
    private workoutSessionService: WorkoutsessionService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initializeChartOptions();
    this.loadTrainingStats();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId'] && !changes['clientId'].isFirstChange()) {
      this.loadTrainingStats();
    }
  }

  initializeChartOptions(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        {
          label: '',
          data: [],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 1.2,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  loadTrainingStats() {
    if (this.clientId && !isNaN(this.clientId)) {
      console.log('Client ID:', this.clientId); // Verificar se o clientId é válido
      const token = this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        this.workoutSessionService.getSessionsQuality(headers, this.clientId).subscribe(
          (response: WorkoutSessionQualityResponse[]) => {
            console.log('API Response:', response);
            if (Array.isArray(response)) {
              const labels: string[] = [];
              const subjectiveEffortData: number[] = [];
              const qualityEffortData: number[] = [];

              response.forEach((stat: WorkoutSessionQualityResponse) => {
                labels.push(stat.month);
                subjectiveEffortData.push(stat.clientSubjectEffortAvarage);
                qualityEffortData.push(stat.ptQualityEffortAvarage);
              });

              this.data = {
                labels: labels,
                datasets: [
                  {
                    label: 'Subjective Effort Scale',
                    data: subjectiveEffortData,
                    fill: false,
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-500'),
                    tension: 0.4
                  },
                  {
                    label: 'Training Session Effort Quality',
                    data: qualityEffortData,
                    fill: false,
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--pink-500'),
                    tension: 0.4
                  }
                ]
              };
            } else {
              console.error('Response is not an array', response);
            }
          },
          error => {
            console.error('Failed to fetch training stats', error);
          }
        );
      }
    } else {
      console.error('Invalid clientId:', this.clientId);
    }
  }

}
