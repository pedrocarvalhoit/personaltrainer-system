import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.scss'
})
export class VerifyAccountComponent {

  verificationCode: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.verificationCode) {
      this.authService.verify(this.verificationCode).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Token is missing');
    }
  }
}
