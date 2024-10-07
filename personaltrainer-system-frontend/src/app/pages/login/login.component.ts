import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(response => {
      this.authService.setToken(response.token);
      this.router.navigate(['personaltrainer/dashboard']);
    }, error => {
      console.error('Login failed', error);
      this.errorMessage = 'Failed to login. Please check your credentials and try again.';
    });
  }

  register(){
    this.router.navigate(['register'])
  }

}
