import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, combineLatest, first, map, tap } from 'rxjs';
import { IDiagnose } from 'src/app/shared/models/examinations/examinations.model';
import { ExaminationService } from 'src/app/shared/services/examinations/examination.service';

@Component({
    selector: 'app-diagnoses',
    templateUrl: './diagnoses.component.html',
    styleUrls: ['./diagnoses.component.scss'],
    providers: [ConfirmationService]
})
export class DiagnosesComponent implements OnInit {

    constructor(
        private examinationService: ExaminationService,
        private activatedRoute: ActivatedRoute,
        private confirmationService: ConfirmationService
    ) { }

    addMode: boolean = false;
    diagnosesForm: FormGroup = new FormGroup({
        Diagnose: new FormControl(null)
    })

    diagnoses$ = this.examinationService.getDiagnoses()
        .pipe(first());

    addedDiagnoses$ = this.examinationService.getExamination()
        .pipe(
            map(examination => examination.Diagnoses)
        )

    searchValue: BehaviorSubject<string> = new BehaviorSubject('');
    searchValue$ = this.searchValue.asObservable();

    filteredDiagnoses$ = combineLatest([
        this.diagnoses$,
        this.searchValue$
    ])
        .pipe(
            map(data => {
                const [diagnoses, searchValue] = data;

                return diagnoses.filter(d => {
                    if (!searchValue) return true;

                    return d.name.toLowerCase().includes(searchValue.toLowerCase());
                })
            })
        )

    filterDiagnoses(event: { OriginalEvent: Event, query: string }): void {
        this.searchValue.next(event.query);
    }

    addNewDiagnose(): void {
        this.addMode = true;
    }

    removeDiagnose(diagnose: IDiagnose): void {
        this.confirmationService.confirm({
            key: 'confirm2',
            target: event.target,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.examinationService.removeDiagnoseFromExamination(diagnose)
                    .subscribe()
            },
            reject: () => {

            }
        });
    }

    submitNewDiagnose(): void {
        const examinationId: string = this.activatedRoute.snapshot.paramMap.get('examinationId')

        const diagnose: IDiagnose = this.diagnosesForm.getRawValue().Diagnose;

        if (!diagnose) return;
        if (diagnose && !diagnose.name) return;

        this.examinationService.addDiagnoseToExamination(diagnose, examinationId)
            .pipe(
                first(),
                tap(() => {
                    this.diagnosesForm.controls.Diagnose.reset();
                })
            )
            .subscribe()
    }

    ngOnInit(): void {
    }

}
