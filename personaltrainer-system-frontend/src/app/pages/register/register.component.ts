import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from './validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  dateOfBirth: string = '';
  mobile: string = '';
  gender: string = '';

  userForm!: FormGroup;
  selectedFile: File | null = null;

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      mobile: ['', Validators.required],
      gender: [''],
      dateOfBirth: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.userForm.valid ) {
      const formData = new FormData();
      formData.append('file', this.selectedFile as File);

      const userData = {
          firstName: this.userForm.get('firstName')?.value,
          lastName: this.userForm.get('lastName')?.value,
          email: this.userForm.get('email')?.value,
          password: this.userForm.get('password')?.value,
          mobile: this.userForm.get('mobile')?.value,
          gender: this.userForm.get('gender')?.value,
          dateOfBirth: this.userForm.get('dateOfBirth')?.value,
      };

      formData.append('user', new Blob([JSON.stringify(userData)], {
        type: 'application/json'
      }));

      this.authService.register(formData).subscribe(
        response => {
          console.log('User register successfuly, ID:', response);
          this.showSuccessMessage();
          setTimeout(() => {
            this.router.navigate(['verify']);
          }, 2000); // Redireciona após 2 segundos
        },
        error => {
          console.error('Error on register new user:', error);
          this.errorMessage = 'Failed to login. Please check your credentials and try again.';
        }
      );
    } else {
      console.log('Invalid form');
    }
  }

  showSuccessMessage(): void {
    // Exibe a mensagem de sucesso
    const successMessageElement = document.getElementById('success-message');
    if (successMessageElement) {
      successMessageElement.style.display = 'block';
    }
  }

  login() {
    this.router.navigate(['login'])
    }

}
