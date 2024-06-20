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

@NgModule({
  declarations: [
    PtDashboardComponent,
    MenuComponent,
    FooterComponent,
    EditComponent,
    CreateClientComponent,
    ClientsComponent,
    EditClientComponent,
    WorkoutSessionComponent
  ],
  imports: [
    CommonModule,
    PersonaltrainerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonaltrainerModule { }
