import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaltrainerRoutingModule } from './personaltrainer-routing.module';
import { PtDashboardComponent } from './pages/pt-dashboard/pt-dashboard.component';
import { MenuComponent } from './component/menu/menu.component';
import { FooterComponent } from './component/footer/footer.component';
import { EditComponent } from './pages/edit-data/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateClientComponent } from './pages/create-client/create-client.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';


@NgModule({
  declarations: [
    PtDashboardComponent,
    MenuComponent,
    FooterComponent,
    EditComponent,
    CreateClientComponent,
    ClientsComponent,
    EditClientComponent
  ],
  imports: [
    CommonModule,
    PersonaltrainerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonaltrainerModule { }
