import { ExerciseStatsResponse, StrengthTestService } from './../../../../../../services/strength-test/strength-test.service';
import { Component, Input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-back-squat',
  templateUrl: './back-squat.component.html',
  styleUrl: './back-squat.component.scss'
})
export class BackSquatComponent {

  @Input() clientId!: number;
  data: any;
  options: any;

  constructor(
    private strengthTestService: StrengthTestService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initializeChartOptions();
    this.loadStrengthStats();
  }

  initializeChartOptions(): void{
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
        labels: [],
        datasets: [
            {
                label: '',
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                data: []
            },
            {
                type: 'bar',
                label: '',
                backgroundColor: documentStyle.getPropertyValue('--green-500'),
                data: [],
                borderColor: 'white',
                borderWidth: 2
            },
            {
                type: 'bar',
                label: '',
                backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                data: []
            }
        ]
    };

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
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
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

  loadStrengthStats(){
    if (this.clientId && !isNaN(this.clientId)) {
      console.log('Client ID:', this.clientId); // Verificar se o clientId é válido
      const token = this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        this.strengthTestService.getBackSquatStats(headers, this.clientId).subscribe(
          (response: ExerciseStatsResponse[]) => {
            console.log('API Response:', response);
            if (Array.isArray(response)) {
              const labels: string[] = [];
              const avarageMaxLoadData: number[] = [];
              const maxLoadData: number[] = [];
              const max1RmData: number[] = [];

              response.forEach((stat: ExerciseStatsResponse) => {
                labels.push(stat.month);
                avarageMaxLoadData.push(stat.maxLoadAvarage);
                maxLoadData.push(stat.maxLoad);
                max1RmData.push(stat.max1Rm);
              });

              this.data = {
                labels: labels,
                datasets: [
                  {
                    label: 'Avarage Max Load',
                    data: avarageMaxLoadData,
                    fill: false,
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-500'),
                    tension: 0.4
                  },
                  {
                    type: 'bar',
                    label: 'Max Load',
                    data: maxLoadData,
                    fill: false,
                    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--green-500'),
                    tension: 0.4
                  },
                  {
                    type: 'bar',
                    label: 'Max 1 Rm',
                    data: max1RmData,
                    fill: false,
                    backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--orange-500'),
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




