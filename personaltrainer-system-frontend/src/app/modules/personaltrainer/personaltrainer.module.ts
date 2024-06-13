import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaltrainerRoutingModule } from './personaltrainer-routing.module';
import { PtDashboardComponent } from './pages/pt-dashboard/pt-dashboard.component';
import { MenuComponent } from './component/menu/menu.component';
import { FooterComponent } from './component/footer/footer.component';
import { EditComponent } from './pages/edit-data/edit/edit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PtDashboardComponent,
    MenuComponent,
    FooterComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    PersonaltrainerRoutingModule,
    FormsModule
  ]
})
export class PersonaltrainerModule { }
