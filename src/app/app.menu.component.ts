import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { MainComponent } from './pages/main/main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[];
    display: boolean;
    menuItems: MenuItem[];

    constructor(public router: Router, public appMain: MainComponent) {}

    goToNewPatient() {
        this.router.navigate(['main/new-patient']);
    }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['./dashboard'],
                    },
                ],
            },
            {
                label: 'UI Patients',
                items: [
                    {
                        label: 'Search Patients',
                        icon: 'pi pi-search',
                        routerLink: ['/uikit/formlayout'],
                    },
                    {
                        label: 'COVID-19 Statistics',
                        icon: 'pi pi-chart-bar',
                        routerLink: ['/uikit/input'],
                    },
                    {
                        label: 'Vaccinations Statistics',
                        icon: 'pi pi-chart-pie',
                        routerLink: ['/uikit/input'],
                    },
                ],
            },
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = <HTMLDivElement>event.target;
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
