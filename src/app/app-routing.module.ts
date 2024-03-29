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
import { VaccinationTypeComponent } from './pages/main/examination/vaccination/vaccination-type/vaccination-type.component';
import { VaccinationInfoComponent } from './pages/main/examination/vaccination/vaccination-info/vaccination-info.component';
import { VaccinationProcessComponent } from './pages/main/examination/vaccination/vaccination-process/vaccination-process.component';
import { VaccinationConfirmationComponent } from './pages/main/examination/vaccination/vaccination-confirmation/vaccination-confirmation.component';
import { CovidStatisticsComponent } from './pages/main/covid-statistics/covid-statistics.component';
import { VaccinationStatisticsComponent } from './pages/main/vaccination-statistics/vaccination-statistics.component';

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
                path: 'covid-statistics',
                component: CovidStatisticsComponent,
            },
            {
                path: 'vaccination-statistics',
                component: VaccinationStatisticsComponent,
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
                        component: ExaminationComponent,
                        children: [
                            {
                                path: 'vaccination-type',
                                component: VaccinationTypeComponent
                            },
                            {
                                path: 'vaccination-info',
                                component: VaccinationInfoComponent
                            },
                            {
                                path: 'vaccination',
                                component: VaccinationProcessComponent
                            },
                            {
                                path: 'vaccination-confirmation',
                                component: VaccinationConfirmationComponent
                            },
                        ]
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
