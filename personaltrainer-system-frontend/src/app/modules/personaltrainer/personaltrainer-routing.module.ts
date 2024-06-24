import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PtDashboardComponent } from './pages/ptdashboard/pt-dashboard.component';
import { EditComponent } from './pages/editdata/edit.component';
import { AuthGuard } from '../../services/auth/auth.guard';
import { CreateClientComponent } from './pages/createclient/create-client.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { EditClientComponent } from './pages/editclient/edit-client.component';
import { WorkoutSessionComponent } from './pages/workoutsession/workout-session.component';
import { CreateWorkoutsessionComponent } from './pages/createworkoutsession/create-workoutsession.component';

const routes: Routes = [
  { path: '', component: PtDashboardComponent },
  { path: 'dashboard', component: PtDashboardComponent },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'create-client', component: CreateClientComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'edit-client/:id', component: EditClientComponent, canActivate: [AuthGuard] },
  { path: 'workout-sessions', component: WorkoutSessionComponent, canActivate: [AuthGuard] },
  { path: 'workout-sessions/create', component: CreateWorkoutsessionComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonaltrainerRoutingModule {}
