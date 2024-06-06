import { RegistrationRequest } from './../../services/models/registration-request';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {email: '', password: '', firstName: '', lastName: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){

  }

  register() {
    this.errorMsg = [];
    this.authService.registerUser({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']); //When clicks register, automathcly redirects to actvate account
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        }
      });
  }

  login() {
    this.router.navigate(['login'])
    }


}
