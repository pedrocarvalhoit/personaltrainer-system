import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PtDashboardComponent } from './pages/pt-dashboard/pt-dashboard.component';

const routes: Routes = [
  {path:"dashboard", component: PtDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaltrainerRoutingModule { }
