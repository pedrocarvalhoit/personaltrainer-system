import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'personaltrainer-system-test';

  constructor(private router: Router){}

  login(){
    this.router.navigate(['login'])
  }

  register(){
    this.router.navigate(['register'])
  }
}
