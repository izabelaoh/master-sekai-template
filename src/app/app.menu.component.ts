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
    bloodTypes: SelectItem[];

    constructor(
        public router: Router,
        public appMain: MainComponent,
        private angularFireStore: AngularFirestore
    ) {}

    newPatientForm: FormGroup = new FormGroup({
        FirstName: new FormControl('', [Validators.required]),
        LastName: new FormControl('', [Validators.required]),
        Email: new FormControl('', [Validators.required]),
        Embg: new FormControl('', [Validators.required]),
        DateOfBirth: new FormControl(null, [Validators.required]),
        Gender: new FormControl(null, [Validators.required]),
        BloodType: new FormControl(null, [Validators.required]),
        Address: new FormControl('', [Validators.required]),
        Phone: new FormControl('', [Validators.required]),
    });

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
                        routerLink: ['/'],
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

        this.bloodTypes = [
            {
                label: 'A+',
                value: { id: 1, name: 'A+', code: 'А' },
            },
            {
                label: 'A-',
                value: { id: 2, name: 'A-', code: 'А-' },
            },
            {
                label: 'B+',
                value: { id: 3, name: 'B+', code: 'B+' },
            },
            {
                label: 'B-',
                value: { id: 4, name: 'B-', code: 'B-' },
            },
            {
                label: 'О+',
                value: { id: 5, name: 'O+', code: 'O+' },
            },
            {
                label: 'O-',
                value: { id: 6, name: 'O-', code: 'O-' },
            },
            {
                label: 'AB+',
                value: { id: 7, name: 'AB+', code: 'AB+' },
            },
            {
                label: 'AB-',
                value: { id: 8, name: 'AB-', code: 'AB-' },
            },
        ];
    }
    onSubmit() {
        if (this.newPatientForm.invalid) {
            console.log('All fields are required');
            return;
        }

        let newPatient = this.newPatientForm.getRawValue();

        this.angularFireStore
            .collection('patients')
            .add(newPatient)
            .then((dataRef) => {
                let patientId = dataRef.id;

                this.router.navigate([`/main/patient-profile/${patientId}`]);
            })
            .catch(() => {
                console.log('Server error! Try again.');
            });
    }
    onCancel() {}
    onKeydown(event: KeyboardEvent) {
        const nodeElement = <HTMLDivElement>event.target;
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
