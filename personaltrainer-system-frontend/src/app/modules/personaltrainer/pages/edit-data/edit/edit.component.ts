import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth/auth.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  dateOfBirth: string = '';
  mobile: string = '';
  gender: string = '';

  constructor(private authService: AuthService ,private userService: UserService, private router: Router) {}

  //Show User Saved Data on fields
   ngOnInit(): void {
    const token = this.authService.getToken(); // Obtém o token JWT do serviço AuthService
    // Verifica se o token está presente
    if (token) {
      // Adiciona o token ao cabeçalho da requisição
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      // Fazer a requisição passando os cabeçalhos como parte das opções
      this.userService.getUserData(headers).subscribe(
        user => {
          console.log('User fetched:', user);
          this.firstName = user.firstName;
          this.lastName =user.lastName;
          this.email = user.email;
          this.dateOfBirth = user.dateOfBirth;
          this.mobile = user.mobile;
          this.gender = user.gender;
        },
        error => {
          console.error('Failed to fetch user', error);
        }
      );
    } else {
      console.error('Token not found');
    }
  }

  //Save the edit data function
  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert("Password and Confirm Password should match.");
      return;
    }

    const token = this.authService.getToken(); // Obtém o token JWT do serviço AuthService
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.userService.editData(headers, this.firstName, this.lastName, this.email, this.password, this.dateOfBirth, this.mobile, this.gender)
        .subscribe(response => {
          this.router.navigate(['personaltrainer/dashboard']);
        }, error => {
          console.error('Update failed', error);
        });
    } else {
      console.error('Token not found');
    }
  }

  cancel() {
    this.router.navigate(['personaltrainer']);
  }

}
