import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/shared/services/patient/patient.service';

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss']
})
export class PersonalInfoComponent implements OnInit {

    constructor(
        private patientService: PatientService
    ) { }

    patient$ = this.patientService.getPatient();

    ngOnInit(): void {
    }

}
