import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert("Password and Confirm Password should match.");
      return;
    }

    this.authService.register(this.firstName, this.lastName, this.email, this.password,this.dateOfBirth,
       this.mobile, this.gender).subscribe(response => {
      this.router.navigate(['verify']);
    }, error => {
      console.error('Registration failed', error);
    });
  }

  login() {
    this.router.navigate(['login'])
    }

}
