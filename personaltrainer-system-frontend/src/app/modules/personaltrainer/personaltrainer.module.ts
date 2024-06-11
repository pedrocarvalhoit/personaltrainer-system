import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaltrainerRoutingModule } from './personaltrainer-routing.module';
import { PtDashboardComponent } from './pages/pt-dashboard/pt-dashboard.component';
import { MenuComponent } from './component/menu/menu.component';


@NgModule({
  declarations: [
    PtDashboardComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    PersonaltrainerRoutingModule
  ]
})
export class PersonaltrainerModule { }
