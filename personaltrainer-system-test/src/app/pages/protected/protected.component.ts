import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-protected',
  template: `
    <h1>Protected Page</h1>
    <p>You are logged in!</p>
    <button (click)="logout()">Logout</button>
  `
})
export class ProtectedComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }
}
