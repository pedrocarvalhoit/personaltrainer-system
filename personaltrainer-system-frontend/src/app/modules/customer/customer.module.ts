import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard.component';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
