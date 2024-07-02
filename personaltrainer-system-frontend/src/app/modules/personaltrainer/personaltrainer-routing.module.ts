import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PtDashboardComponent } from './pages/ptdashboard/pt-dashboard.component';
import { EditComponent } from './pages/editdata/edit.component';
import { AuthGuard } from '../../services/auth/auth.guard';
import { CreateClientComponent } from './pages/createclient/create-client.component';
import { ClientsComponent } from './pages/clientslist/clients.component';
import { EditClientComponent } from './pages/editclient/edit-client.component';
import { WorkoutSessionComponent } from './pages/workoutsession/workout-session.component';
import { CreateWorkoutsessionComponent } from './pages/createworkoutsession/create-workoutsession.component';
import { ClientComponent } from './pages/client/client.component';
import { WorkoutProgramsComponent } from './pages/workout-programs/workout-programs.component';
import { CreateWorkoutProgramComponent } from './pages/createworkoutprogram/create-workout-program.component';

const routes: Routes = [
  { path: '', component: PtDashboardComponent },
  { path: 'dashboard', component: PtDashboardComponent },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'create-client', component: CreateClientComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'client/:id', component: ClientComponent, canActivate: [AuthGuard] },
  { path: 'edit-client/:id', component: EditClientComponent, canActivate: [AuthGuard] },
  { path: 'workout-sessions', component: WorkoutSessionComponent, canActivate: [AuthGuard] },
  { path: 'workout-session/create', component: CreateWorkoutsessionComponent, canActivate: [AuthGuard] },
  { path: 'workout-programs', component: WorkoutProgramsComponent, canActivate: [AuthGuard] },
  { path: 'workout-program/create', component: CreateWorkoutProgramComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonaltrainerRoutingModule {}
