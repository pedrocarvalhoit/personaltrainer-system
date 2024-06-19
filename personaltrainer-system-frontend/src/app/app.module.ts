import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyAccountComponent } from './pages/verify/verify-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { ProtectedComponent } from './pages/protected/protected.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { CodeInputModule } from 'angular-code-input';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterLink } from '@angular/router';
import { CreateClientComponent } from './modules/personaltrainer/pages/create-client/create-client.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VerifyAccountComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CodeInputModule,
    HttpClientModule,
    RouterLink,
    JwtModule.forRoot({ // Config JwtModule
      config: {
        tokenGetter: () => localStorage.getItem('jwt_token'),
        allowedDomains: [
          //'http://localhost:8088/api/v1/auth/register'
        ], // Se necessário, adicione seus domínios permitidos
        disallowedRoutes: [
          //'http://localhost:8088/api/v1/auth/authenticate'
        ], // Se necessário, adicione rotas que não precisam de token
      },
    }),
  ],
  providers: [AuthService, AuthGuard, JwtHelperService, provideAnimationsAsync(), provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
