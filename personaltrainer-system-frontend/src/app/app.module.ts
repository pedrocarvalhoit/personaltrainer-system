import { CalendarModule } from 'primeng/calendar';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyAccountComponent } from './pages/verify/verify-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { CodeInputModule } from 'angular-code-input';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PersonaltrainerModule } from './modules/personaltrainer/personaltrainer.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VerifyAccountComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CodeInputModule,
    HttpClientModule,
    ToastModule,
    PersonaltrainerModule,
    RouterLink,
    JwtModule.forRoot({
      // Config JwtModule
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
  providers: [
    AuthService,
    AuthGuard,
    MessageService,
    JwtHelperService,
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
