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

    examination: BehaviorSubject<IExamination> = new BehaviorSubject({} as IExamination)
    examination$: Observable<IExamination> = this.examination.asObservable();

    examinationForm: FormGroup;

    createExamination(): void {
        console.log(this.examinationForm.getRawValue())
    }

    ngOnInit(): void {
        const patientId: string = this.activatedRoute.snapshot.paramMap.get('id');
        this.examinationService.getNewExamination(patientId)
            .pipe(
                first(),
                tap(examination => {
                    console.log(examination)

                    this.examination.next(examination);

                    this.examinationForm = new FormGroup({
                        PatientId: new FormControl(patientId),
                        ExaminationDate: new FormControl(examination.ExaminationDate),
                        Department: new FormControl(null),
                        IsCovidExamination: new FormControl(examination.IsCovidExamination),
                        Diagnoses: new FormControl([]),
                        Therapies: new FormControl([]),
                        Vaccinations: new FormControl([])
                    })
                })
            )
            .subscribe()
    }

    ngOnDestroy(): void {

    }

}
