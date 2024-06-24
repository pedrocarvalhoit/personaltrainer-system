import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaltrainerRoutingModule } from './personaltrainer-routing.module';
import { PtDashboardComponent } from './pages/ptdashboard/pt-dashboard.component';
import { MenuComponent } from './component/menu/menu.component';
import { FooterComponent } from './component/footer/footer.component';
import { EditComponent } from './pages/editdata/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateClientComponent } from './pages/createclient/create-client.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { EditClientComponent } from './pages/editclient/edit-client.component';
import { WorkoutSessionComponent } from './pages/workoutsession/workout-session.component';
import { CreateWorkoutsessionComponent } from './pages/createworkoutsession/create-workoutsession.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    PtDashboardComponent,
    MenuComponent,
    FooterComponent,
    EditComponent,
    CreateClientComponent,
    ClientsComponent,
    EditClientComponent,
    WorkoutSessionComponent,
    CreateWorkoutsessionComponent
  ],
  imports: [
    CommonModule,
    PersonaltrainerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    CalendarModule
  ]
})
export class PersonaltrainerModule { }
