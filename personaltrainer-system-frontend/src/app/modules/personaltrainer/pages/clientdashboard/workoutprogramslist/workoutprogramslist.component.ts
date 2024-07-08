import { Component, Input, OnInit } from '@angular/core';
import { WorkoutProgram, WorkoutprogramService } from '../../../../../services/workoutprogram/workoutprogram.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { PageResponse } from '../../../../../services/client/client.service';

@Component({
  selector: 'app-workoutprogramslist',
  templateUrl: './workoutprogramslist.component.html',
  styleUrl: './workoutprogramslist.component.scss'
})
export class WorkoutprogramslistComponent implements OnInit {

  @Input() clientId!: number;

  workoutPrograms: WorkoutProgram[] = [];
  currentPage: number = 0;
  pageSize: number = 30;
  totalElements: number = 0;

  showDisabledPrograms = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private workoutProgramService: WorkoutprogramService,
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.loadPrograms();
  }

  loadPrograms(page: number = 0): void {
    console.log('loadPrograms called with page:', page);
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      const programObservable = this.showDisabledPrograms
        ? this.workoutProgramService.getAllDisabledPrograms(headers, this.clientId, page, this.pageSize)
        : this.workoutProgramService.getAllEnabledPrograms(headers, this.clientId, page, this.pageSize);

      programObservable.subscribe(
        (response: PageResponse<WorkoutProgram>) => {
          console.log('API Response:', response);
          this.workoutPrograms = response.content;
          this.currentPage = response.pageNumber;
          this.totalElements = response.totalElements;
        },
        (error) => {
          console.error('Failed to load workout programs:', error);
        }
      );
    } else {
      console.error('Token not found');
    }
  }

  toggleProgramList() {
    this.showDisabledPrograms = !this.showDisabledPrograms;
    this.loadPrograms();
  }

  downloadPdf(programId: number, programTitle: string): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    this.workoutProgramService.exportToPdf(headers, programId).subscribe(
      response => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${programTitle}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error => {
        console.error('Download failed', error);
        alert('Failed to download PDF. Please check the program ID and try again.');
      }
    );
  }

  }
}
