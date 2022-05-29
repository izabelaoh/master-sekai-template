import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './pages/main/dashboard/dashboard.component';
import { MainComponent } from './pages/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AppLoginComponent } from './pages/auth/login/login.component';
import { NewPatientComponentnent } from './pages/main/newPatient/newPatient.component';

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
        ],
    },
    { path: '*', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
