import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PtDashboardComponent } from './pages/pt-dashboard/pt-dashboard.component';
import { EditComponent } from './pages/edit-data/edit.component';
import { AuthGuard } from '../../services/auth/auth.guard';
import { CreateClientComponent } from './pages/create-client/create-client.component';
import { ClientsComponent } from './pages/clients-list/clients.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { WorkoutSessionComponent } from './pages/workout-session/workout-session.component';
import { CreateWorkoutsessionComponent } from './pages/create-workout-session/create-workoutsession.component';
import { ClientDashboardComponent } from './pages/clientdashboard/clientdashboard.component';
import { WorkoutProgramsComponent } from './pages/workout-programs/workout-programs.component';
import { CreateWorkoutProgramComponent } from './pages/create-workout-program/create-workout-program.component';
import { EditworkoutprogramComponent } from './pages/edit-workout-program/editworkoutprogram.component';

const routes: Routes = [
  { path: '', component: PtDashboardComponent },
  { path: 'dashboard', component: PtDashboardComponent },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'create-client', component: CreateClientComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'client-dashboard/:id', component: ClientDashboardComponent, canActivate: [AuthGuard] },
  { path: 'edit-client/:id', component: EditClientComponent, canActivate: [AuthGuard] },
  { path: 'workout-sessions', component: WorkoutSessionComponent, canActivate: [AuthGuard] },
  { path: 'workout-session/create', component: CreateWorkoutsessionComponent, canActivate: [AuthGuard] },
  { path: 'workout-programs', component: WorkoutProgramsComponent, canActivate: [AuthGuard] },
  { path: 'workout-program/create', component: CreateWorkoutProgramComponent, canActivate: [AuthGuard] },
  { path: 'edit-workoutprogram/:id', component: EditworkoutprogramComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonaltrainerRoutingModule {}
