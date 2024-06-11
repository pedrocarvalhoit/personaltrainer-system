import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaltrainerRoutingModule } from './personaltrainer-routing.module';
import { PtDashboardComponent } from './pages/pt-dashboard/pt-dashboard.component';
import { MenuComponent } from './component/menu/menu.component';
import { FooterComponent } from './component/footer/footer.component';


@NgModule({
  declarations: [
    PtDashboardComponent,
    MenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PersonaltrainerRoutingModule
  ]
})
export class PersonaltrainerModule { }
