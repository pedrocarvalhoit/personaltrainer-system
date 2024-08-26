import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaltrainerRoutingModule } from './personaltrainer-routing.module';
import { PtDashboardComponent } from './pages/pt-dashboard/pt-dashboard.component';
import { MenuComponent } from './component/menu/menu.component';
import { FooterComponent } from './component/footer/footer.component';
import { EditComponent } from './pages/edit-data/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateClientComponent } from './pages/create-client/create-client.component';
import { ClientsComponent } from './pages/clients-list/clients.component';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { WorkoutSessionComponent } from './pages/workout-sessions-list/workout-session.component';
import { CreateWorkoutsessionComponent } from './pages/create-workout-session/create-workoutsession.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ClientDashboardComponent } from './pages/clientdashboard/clientdashboard.component';
import { WorkoutProgramsComponent } from './pages/workout-programs/workout-programs.component';
import { CreateWorkoutProgramComponent } from './pages/create-workout-program/create-workout-program.component'; // Necessário para animações do PrimeNG
import { EditorModule } from '@tinymce/tinymce-angular';
import { WorkoutsessionsstatsComponent } from './pages/clientdashboard/sessions-and-programs/workout-sessions-stats/workoutsessionsstats.component';
import { TrainingindicativestatsComponent } from './pages/clientdashboard/sessions-and-programs/training-indicative-stats/trainingindicativestats.component';
import { ChartModule } from 'primeng/chart';
import { EditworkoutprogramComponent } from './pages/edit-workout-program/editworkoutprogram.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CooperTestComponent } from './pages/clientdashboard/physical-tests/cooper-classification/cooper-test.component';
import { WorkoutprogramslistComponent } from './pages/clientdashboard/sessions-and-programs/workout-programs-list/workoutprogramslist.component';
import { CreateCooperTestComponent } from './pages/create-cooper-test/create-cooper-test.component';
import { CooperHistoricComponent } from './pages/clientdashboard/physical-tests/cooper-historic/cooper-historic.component';
import { CooperResultComponent } from './pages/clientdashboard/physical-tests/cooper-result/cooper-result.component';
import { CreateStrengthTestComponent } from './pages/create-strength-test/create-strength-test.component';
import { BackSquatComponent } from './pages/clientdashboard/strength-tests/back-squat/back-squat.component';
import { DeadliftComponent } from './pages/clientdashboard/strength-tests/deadlift/deadlift.component';

@NgModule({
  declarations: [
    PtDashboardComponent,
    MenuComponent,
    FooterComponent,
    EditComponent,
    CreateClientComponent,
    ClientsComponent,
    EditClientComponent,
    WorkoutSessionComponent,
    CreateWorkoutsessionComponent,
    ClientDashboardComponent,
    WorkoutProgramsComponent,
    CreateWorkoutProgramComponent,
    WorkoutsessionsstatsComponent,
    TrainingindicativestatsComponent,
    WorkoutprogramslistComponent,
    EditworkoutprogramComponent,
    CooperTestComponent,
    CreateCooperTestComponent,
    CooperHistoricComponent,
    CooperResultComponent,
    CreateStrengthTestComponent,
    BackSquatComponent,
    DeadliftComponent,
  ],
  imports: [
    CommonModule,
    PersonaltrainerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    EditorModule,
    ChartModule,
    ToastModule,
    MessagesModule,
    ConfirmPopupModule
  ]

})
export class PersonaltrainerModule { }
