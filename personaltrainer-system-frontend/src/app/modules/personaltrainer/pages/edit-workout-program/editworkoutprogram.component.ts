import { RedirectmessageService } from '../../../../services/redirect-messages/redirectmessage.service';
import { Component, OnInit } from '@angular/core';
import { WorkoutProgram, WorkoutprogramService } from '../../../../services/workout-program/workoutprogram.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-editworkoutprogram',
  templateUrl: './editworkoutprogram.component.html',
  styleUrl: './editworkoutprogram.component.scss'
})
export class EditworkoutprogramComponent implements OnInit {

  programId!: number;
  program!: WorkoutProgram;

  tinyMceConfig: any = {
    height: 300,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help'
  };

  constructor(
    private route: ActivatedRoute,
    private workoutProgramService: WorkoutprogramService,
    private authService: AuthService,
    private messageService: MessageService,
    private redirectMessageService: RedirectmessageService,
    private router: Router
  ) {}

  ngOnInit(){
    this.route.params.subscribe((params) => {
      this.programId = params['id'];
      this.loadWorkouprogramDetails();
    });
  }

  loadWorkouprogramDetails(): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
      this.workoutProgramService.getProgramById(headers, this.programId).subscribe(
        (program: WorkoutProgram) => {
          this.program = program;
        },
        (error) => {
          console.error('Failed to load client details:', error);
        }
      );
    }
  }

  onSubmit() {
    const token = this.authService.getToken(); // Obtém o token JWT do serviço AuthService
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.workoutProgramService.editData(headers, this.programId,this.program.title, this.program.startDate, this.program.endDate,
        this.program.trainingSessionContent, this.program.note, this.program.enabled
      )
        .subscribe(response => {
          this.redirectMessageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Program updated successfully' });
          this.router.navigate([`personaltrainer/client-dashboard/${this.program.clientId}`]);
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update program' });
          console.error('Update failed', error);
        });
    } else {
      console.error('Token not found');
    }
  }

  cancel() {
    this.router.navigate([`personaltrainer/client-dashboard/${this.program.clientId}`]);
  }

}
