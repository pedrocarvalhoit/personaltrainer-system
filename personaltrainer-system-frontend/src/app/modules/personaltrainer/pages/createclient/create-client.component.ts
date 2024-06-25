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


  constructor(private router: Router, private fb: FormBuilder, private clientService: ClientService, private authService: AuthService) {}

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

  onSubmit(): void {
    const token = this.authService.getToken();

    if (this.clientForm.valid && token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const clientData = {
        personalData: this.clientForm.value
      };

      this.clientService.saveClient(headers, clientData).subscribe(
        response => {
          console.log('Cliente cadastrado com sucesso, ID:', response);
          this.showSuccessMessage();
          setTimeout(() => {
            this.router.navigate(['personaltrainer/clients']);
          }, 2000); // Redireciona após 2 segundos
        },
        error => {
          console.error('Erro ao cadastrar cliente:', error);
        }
      );
    } else {
      console.log('Formulário inválido');
    }
  }

  showSuccessMessage(): void {
    // Exibe a mensagem de sucesso
    const successMessageElement = document.getElementById('success-message');
    if (successMessageElement) {
      successMessageElement.style.display = 'block';
    }
  }
}
