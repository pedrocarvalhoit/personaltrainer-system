import { RedirectmessageService } from '../../../../services/redirectmessages/redirectmessage.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../../services/client/client.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.scss'
})
export class CreateClientComponent {

  clientForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(private router: Router,
    private fb: FormBuilder,
    private clientService: ClientService,
    private redirectMessageService: RedirectmessageService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      gender: [''],
      dateOfBirth: ['', Validators.required]
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    const token = this.authService.getToken();

    if (this.clientForm.valid && token) {
      const formData = new FormData();
      formData.append('file', this.selectedFile as File);

      const clientData = {
        personalData: {
          firstName: this.clientForm.get('firstName')?.value,
          lastName: this.clientForm.get('lastName')?.value,
          email: this.clientForm.get('email')?.value,
          mobile: this.clientForm.get('mobile')?.value,
          gender: this.clientForm.get('gender')?.value,
          dateOfBirth: this.clientForm.get('dateOfBirth')?.value,
        }
      };

      formData.append('client', new Blob([JSON.stringify(clientData)], {
        type: 'application/json'
      }));

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.clientService.saveClient(headers, formData).subscribe(
        response => {
          this.redirectMessageService.addMessage({ severity: 'success', summary: 'Success', detail: 'Client created successfully' });
            this.router.navigate(['personaltrainer/clients']);
        },
        error => {
          console.error('Erro ao cadastrar cliente:', error);
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }

}
