import { HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';

import { AuthService } from '../../../../../../services/auth/auth.service';
import {
  CooperTestClassificationResponse,
  CooperTestService,
} from '../../../../../../services/cooper-test/cooper-test.service';

@Component({
  selector: 'app-cooper-test',
  templateUrl: './cooper-test.component.html',
  styleUrl: './cooper-test.component.scss'
})
export class CooperTestComponent {

  @Input() clientId!: number;

  classification : string = '';
  classificationClass: string | undefined;

  constructor(
    private cooperTestService: CooperTestService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadCooperTestClassification();
  }


  loadCooperTestClassification() {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.cooperTestService.getClassification(headers, this.clientId).subscribe(
        (response: CooperTestClassificationResponse) => {
          this.classification = response.classification;
          this.setClassificationClass(this.classification);
        },
        (error) => {
          console.error('Failed to load enabled clients:', error);
        }
      );
    }
  }

  setClassificationClass(classification: string): void {
    switch (classification.toLowerCase()) {
      case 'very_weak':
        this.classificationClass = 'very-weak';
        break;
      case 'weak':
        this.classificationClass = 'weak';
        break;
      case 'regular':
        this.classificationClass = 'regular';
        break;
      case 'good':
        this.classificationClass = 'good';
        break;
      case 'excellent':
        this.classificationClass = 'excellent';
        break;
      default:
        this.classificationClass = 'undefined';
        break;
    }
  }

  }


