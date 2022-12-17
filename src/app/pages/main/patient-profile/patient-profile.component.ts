import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { tap } from 'rxjs';
import { IPatient } from 'src/app/shared/models/patient/patient.model';
import { PatientService } from 'src/app/shared/services/patient/patient.service';

@Component({
    selector: 'app-patient-profile',
    templateUrl: './patient-profile.component.html',
    styleUrls: ['./patient-profile.component.scss'],
})
export class PatientProfileComponent {
    constructor(
        private patientService: PatientService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    insuranceMessages: Message[] = [];

    patient$ = this.patientService.getPatient()
        .pipe(
            tap(patient => {
                if (patient.IsValidInsurance) {
                    this.insuranceMessages.push({
                        severity: 'success',
                        summary: 'Valid Insurance',
                        // detail: moment(new Date(patient.InsuranceUntil.seconds * 1000)).format('DD.MM.YYYY'),
                    })
                } else {
                    this.insuranceMessages.push({
                        severity: 'error',
                        summary: 'Invalid Insurance',
                        // detail: moment(new Date(patient.InsuranceUntil.seconds * 1000)).format('DD.MM.YYYY'),
                    })
                }
            })
        );

    patientTabs$ = this.patientService.getPatientTabs();

    editPatient(patient: IPatient): void {
        this.router.navigate([`main/edit-patient/${patient.Id}`])
    }

    ngOnInit() {
        const patientId: string = this.activatedRoute.snapshot.paramMap.get('id')
        this.patientService.getPatientAsync(patientId)
    }

    ngOnDestroy() {
        this.patientService.clearPatient();
    }
}
