import { Router } from '@angular/router';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  firstName: string = '';

  showEditOption: boolean = false;

  isMyClientsRoute: boolean = false;

  constructor(private authService: AuthService, private userService: UserService, private router: Router){}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isMyClientsRoute = this.router.url === '/personaltrainer/clients';
    });
    const token = this.authService.getToken(); // Obtém o token JWT do serviço AuthService
    // Verifica se o token está presente
    if (token) {
      // Adiciona o token ao cabeçalho da requisição
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      // Fazer a requisição passando os cabeçalhos como parte das opções
      this.userService.getUserName(headers).subscribe(
        user => {
          console.log('User fetched:', user);
          this.firstName = user.firstName;
        },
        error => {
          console.error('Failed to fetch user', error);
        }
      );
    } else {
      console.error('Token not found');
    }
  }

  editData(){
    this.router.navigate(['/personaltrainer/edit'])
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }

}
