import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './../../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../../../../services/user/user.service';
import { MessageService } from 'primeng/api';
import { RedirectmessageService } from '../../../../services/redirectmessages/redirectmessage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [MessageService]
})
export class MenuComponent implements OnInit {

  firstName: string = '';
  userPhotoUrl: string = '';

  showEditOption: boolean = false;

  isMyClientsRoute: boolean = false;

  //Dialog vars
  visible: boolean = false;

  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private redirectMessageService: RedirectmessageService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isMyClientsRoute = this.router.url === '/personaltrainer/clients';
        const messages = this.redirectMessageService.getMessages();
        if (messages.length > 0) {
          this.messageService.addAll(messages);
        }
      }
    });

    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      this.userService.getUserDataForMenu(headers).subscribe(
        user => {
          console.log('User fetched:', user);
          this.firstName = user.firstName;
          this.userPhotoUrl = user.photo;
        },
        error => {
          console.error('Failed to fetch user', error);
        }
      );
    } else {
      console.error('Token not found');
    }
  }

  editData() {
    this.router.navigate(['/personaltrainer/edit']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  updatePhoto() {
    const token = this.authService.getToken();

    if (token) {
      const formData = new FormData();
      formData.append('file', this.selectedFile as File);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.userService.updatePhoto(headers, formData).subscribe(
        response => {
          this.userPhotoUrl = response; // Atualize a URL da foto do usuário
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Photo updated successfully' });
          this.visible = false; // Feche o diálogo após o sucesso
        },
        error => {
          console.error('Error on update User photo:', error);
        }
      );
    } else {
      console.log('Invalid form');
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  showDialog() {
    this.visible = true;
  }

}
