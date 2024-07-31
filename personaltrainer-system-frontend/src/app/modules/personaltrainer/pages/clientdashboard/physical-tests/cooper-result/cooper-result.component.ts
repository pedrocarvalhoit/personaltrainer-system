import { Component, Input, OnInit } from '@angular/core';
import { CooperTestResultResponse, CooperTestService } from '../../../../../../services/cooper-test/cooper-test.service';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cooper-result',
  templateUrl: './cooper-result.component.html',
  styleUrl: './cooper-result.component.scss'
})
export class CooperResultComponent implements OnInit{

  @Input() clientId!: number;

  result : number | undefined;

  constructor(
    private cooperTestService: CooperTestService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadCooperTestResult();
  }

  loadCooperTestResult() {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.cooperTestService.getLastResultByClient(headers, this.clientId).subscribe(
        (response: CooperTestResultResponse) => {
          this.result = response.result;
        },
        (error) => {
          console.error('Failed to load enabled clients:', error);
        }
      );
    }
  }

}
