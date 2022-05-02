import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MainComponent } from './pages/main/main.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items: MenuItem[];

    constructor(
        public appMain: MainComponent,
        private angularAuth: AngularFireAuth,
        private router: Router
    ) {}

    loggedUser;
    menuItems: MenuItem[];

    ngOnInit() {
        this.loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));

        this.menuItems = [
            {
                label: 'Log Out',
                icon: 'pi pi-sign-out',
            },
        ];
    }

    signOut() {
        this.angularAuth.signOut().then(() => {
            localStorage.clear();
            this.router.navigate(['/auth/login']);
        });
    }
}
