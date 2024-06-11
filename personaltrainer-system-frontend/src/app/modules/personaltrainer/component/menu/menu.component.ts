import { Router } from '@angular/router';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  constructor(private authService: AuthService, private router: Router){}

  logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }

}
