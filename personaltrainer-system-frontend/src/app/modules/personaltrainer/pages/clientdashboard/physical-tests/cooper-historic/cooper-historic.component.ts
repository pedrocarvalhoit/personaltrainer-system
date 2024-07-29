import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CooperTestHistoricResponse, CooperTestService } from '../../../../../../services/cooper-test/cooper-test.service';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cooper-historic',
  templateUrl: './cooper-historic.component.html',
  styleUrl: './cooper-historic.component.scss'
})
export class CooperHistoricComponent implements OnInit, OnChanges {

  @Input() clientId!: number;
  data: any;
  options: any;

  constructor(
    private cooperTestService: CooperTestService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initializeChartOptions();
    this.loadCooperTestHistoric();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId'] && !changes['clientId'].isFirstChange()) {
      this.loadCooperTestHistoric();
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

  loadCooperTestHistoric() {
    if (this.clientId && !isNaN(this.clientId)) {
      console.log('Client ID:', this.clientId); // Check if Client is valid
      const token = this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        this.cooperTestService.getCooperTestHistoric(headers, this.clientId).subscribe(
          (response: CooperTestHistoricResponse[]) => {
            console.log('API Response:', response);
            if (Array.isArray(response)) {
              const labels: string[] = [];
              const Vo2Max: number[] = [];

              response.forEach((stat: CooperTestHistoricResponse) => {
                labels.push(stat.month);
                Vo2Max.push(stat.result);
              });

              this.data = {
                labels: labels,
                datasets: [
                  {
                    label: 'Vo2Max',
                    data: Vo2Max,
                    fill: false,
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--blue-500'),
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
