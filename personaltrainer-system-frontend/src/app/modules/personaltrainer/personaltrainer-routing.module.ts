import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PtDashboardComponent } from './pages/pt-dashboard/pt-dashboard.component';
import { EditComponent } from './pages/edit-data/edit.component';
import { AuthGuard } from '../../services/auth/auth.guard';
import { CreateClientComponent } from './pages/create-client/create-client.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';

const routes: Routes = [
  { path: '', component: PtDashboardComponent },
  { path: 'dashboard', component: PtDashboardComponent },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'create-client', component: CreateClientComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
  { path: 'edit-client/:id', component: EditClientComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonaltrainerRoutingModule {}
