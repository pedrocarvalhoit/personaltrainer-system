import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PtDashboardComponent } from './pages/pt-dashboard/pt-dashboard.component';
import { EditComponent } from './pages/edit-data/edit/edit.component';
import { AuthGuard } from '../../services/auth/auth.guard';

const routes: Routes = [
  {path:'', component: PtDashboardComponent},
  {path:"dashboard", component: PtDashboardComponent},
  { path: "edit", component: EditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaltrainerRoutingModule { }
