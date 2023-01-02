import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { IPatient } from 'src/app/shared/models/patient/patient.model';
import { ExaminationService } from 'src/app/shared/services/examinations/examination.service';
import { PatientService } from 'src/app/shared/services/patient/patient.service';

@Component({
    selector: 'app-indicators',
    templateUrl: './indicators.component.html',
    styleUrls: ['./indicators.component.scss']
})
export class IndicatorsComponent implements OnInit {

    constructor(
        private examinationSerivce: ExaminationService,
        private patientService: PatientService
    ) { }

    selectedIndicator: string = '';

    indicatorOptions = [
        { name: 'Active', value: 'Active' },
        { name: 'Recovered', value: 'Recovered' },
        { name: 'Deceased', value: 'Deceased' }
    ];

    onOptionClickHandler(data): void {
        console.log(data)
    }

    changePatientStatus(): void {
        let updatedPatient: Partial<IPatient> = {};

        if (this.selectedIndicator === 'IsCovidActive') {
            updatedPatient.IsCovidActive = true;
            updatedPatient.IsCovidRecovered = false;
            updatedPatient.IsCovidDeceased = false;
        }

        if (this.selectedIndicator === 'IsCovidRecovered') {
            updatedPatient.IsCovidActive = false;
            updatedPatient.IsCovidRecovered = true;
            updatedPatient.IsCovidDeceased = false;
        }

        if (this.selectedIndicator === 'IsCovidDeceased') {
            updatedPatient.IsCovidActive = false;
            updatedPatient.IsCovidRecovered = false;
            updatedPatient.IsCovidDeceased = true;
        }

        this.patientService.updatePatient(updatedPatient)
            .subscribe()
    }

    ngOnInit(): void {
        this.patientService.getPatient()
            .pipe(
                tap(patient => {
                    if (patient.IsCovidActive) {
                        this.selectedIndicator = 'IsCovidActive';
                    }

                    if (patient.IsCovidRecovered) {
                        this.selectedIndicator = 'IsCovidRecovered';
                    }

                    if (patient.IsCovidDeceased) {
                        this.selectedIndicator = 'IsCovidDeceased';
                    }
                })
            )
            .subscribe()
    }

}
