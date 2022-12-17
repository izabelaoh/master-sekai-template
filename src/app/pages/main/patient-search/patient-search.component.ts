import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { IPatient } from 'src/app/shared/models/patient/patient.model';
import { PatientService } from 'src/app/shared/services/patient/patient.service';

@Component({
    selector: 'app-patient-search',
    templateUrl: './patient-search.component.html',
    styleUrls: ['./patient-search.component.scss']
})
export class PatientSearchComponent implements OnInit {

    constructor(
        private patientService: PatientService,
        private router: Router
    ) { }

    patients$ = this.patientService.getAllPatients();
    cols: any[] = [
        { field: 'name', header: 'Patient Name' },
        { field: 'personalNo', header: 'Personal No.' },
        { field: 'idNumber', header: 'ID Number' },
        { field: 'gender', header: 'Gender' },
        { field: 'dateOfBirth', header: 'Date of Birth' }
    ]

    viewPatient(patient: IPatient): void {
        this.router.navigate([`/main/patient-profile/${patient.Id}`])
    }

    ngOnInit(): void {

    }

}
