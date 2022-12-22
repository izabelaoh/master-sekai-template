import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, first, map, Observable, of, tap } from 'rxjs';
import { IExamination } from 'src/app/shared/models/examinations/examinations.model';
import { ExaminationService } from 'src/app/shared/services/examinations/examination.service';

@Component({
    selector: 'app-examination',
    templateUrl: './examination.component.html',
    styleUrls: ['./examination.component.scss']
})
export class ExaminationComponent implements OnInit {

    constructor(
        private examinationService: ExaminationService,
        private activatedRoute: ActivatedRoute
    ) { }

    examinationForm: FormGroup;

    createExamination(): void {
        console.log(this.examinationForm.getRawValue())
    }

    ngOnInit(): void {
        const patientId: string = this.activatedRoute.snapshot.paramMap.get('id');
        const examinationId: string = this.activatedRoute.snapshot.paramMap.get('examinationId');

        this.examinationService.getExaminationAsync(examinationId)
            .pipe(
                first(),
                tap(examination => {
                    console.log(examination)

                    this.examinationForm = new FormGroup({
                        PatientId: new FormControl(patientId),
                        ExaminationDate: new FormControl(examination.ExaminationDate),
                        Department: new FormControl(examination.Department),
                        IsCovidExamination: new FormControl(examination.IsCovidExamination),
                        Diagnoses: new FormControl(examination.Diagnoses),
                        Therapies: new FormControl(examination.Therapies),
                        Vaccinations: new FormControl(examination.Vaccinations)
                    })
                })
            )
            .subscribe()
    }

    ngOnDestroy(): void {

    }

}
