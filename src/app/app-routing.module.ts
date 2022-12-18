import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/main/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AppLoginComponent } from './pages/auth/login/login.component';
import { NewPatientComponentnent } from './pages/main/new-patient/new-patient.component';
import { PatientProfileComponent } from './pages/main/patient-profile/patient-profile.component';
import { PersonalInfoComponent } from './pages/main/patient-profile/components/personal/personal.component';
import { ExaminationsComponent } from './pages/main/patient-profile/components/examinations/examinations.component';
import { CovidExaminationsComponent } from './pages/main/patient-profile/components/covid-examinations/covid-examinations.component';
import { PatientSearchComponent } from './pages/main/patient-search/patient-search.component';
import { EditPatientComponent } from './pages/main/edit-patient/edit-patient.component';
import { ExaminationComponent } from './pages/main/examination/examination.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { InputComponent } from './components/input/input.component';

const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: AppLoginComponent,
            },
        ],
    },
    {
        path: 'docs',
        component: InputComponent,
    },
    {
        path: 'main',
        component: MainComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'new-patient',
                component: NewPatientComponentnent,
            },
            {
                path: 'edit-patient/:id',
                component: EditPatientComponent,
            },
            {
                path: 'patients',
                component: PatientSearchComponent,
            },
            {
                path: 'patient-profile/:id',
                component: PatientProfileComponent,
                children: [
                    {
                        path: 'personal',
                        component: PersonalInfoComponent
                    },
                    {
                        path: 'examinations',
                        component: ExaminationsComponent
                    },
                    {
                        path: 'new-examination/:examinationId',
                        component: ExaminationComponent
                    },
                    {
                        path: 'covid-examinations',
                        component: CovidExaminationsComponent
                    },
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'personal'
                    },
                    {
                        path: '**',
                        pathMatch: 'full',
                        redirectTo: 'personal'
                    },
                ]
            },
        ],
    },
    { path: '*', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
