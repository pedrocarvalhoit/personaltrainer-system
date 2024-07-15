import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyAccountComponent } from './pages/verify/verify-account.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'verify', component: VerifyAccountComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent },
  {path: "personaltrainer", loadChildren: () => import("./modules/personaltrainer/personaltrainer.module").then(m => m.PersonaltrainerModule),
    canActivate:[AuthGuard]
  },
  {path: "customer", loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule),
    canActivate:[AuthGuard]
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
