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
  userPhotoUrl: String = '';

  showEditOption: boolean = false;

  isMyClientsRoute: boolean = false;

  //Dialog vars
  visible: boolean = false;
  currentClient: any;
  clientPhoto: string = '';

  selectedFile: File | null = null;

  constructor(private authService: AuthService, private userService: UserService, private router: Router){}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isMyClientsRoute = this.router.url === '/personaltrainer/clients';
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

  editData(){
    this.router.navigate(['/personaltrainer/edit'])
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }

  updatePhoto(){
    const token = this.authService.getToken();

    if (token) {
      const formData = new FormData();
      formData.append('file', this.selectedFile as File);

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      this.userService.updatePhoto(headers, formData).subscribe(
        response => {
          console.log('User photo update successfuly:', response);
          window.location.reload();
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

  showDialog(){
    this.visible = true;
  }

}
