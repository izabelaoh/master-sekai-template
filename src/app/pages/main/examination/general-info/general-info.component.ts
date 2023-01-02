import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, combineLatest, first, map, Observable, tap } from 'rxjs';
import { IExamination } from 'src/app/shared/models/examinations/examinations.model';
import { ExaminationService } from 'src/app/shared/services/examinations/examination.service';

@Component({
    selector: 'app-general-info',
    templateUrl: './general-info.component.html',
    styleUrls: ['./general-info.component.scss'],
    providers: [ConfirmationService]
})
export class GeneralInfoComponent implements OnInit {

    @Input() examinationForm: FormGroup;

    constructor(
        private examinationService: ExaminationService,
        private confirmationService: ConfirmationService
    ) { }

    isSubmitted$: Observable<boolean> = this.examinationService.getExamination()
        .pipe(
            map(examination => examination.IsSubmitted)
        )

    generalInfoForm: FormGroup;

    departments$ = this.examinationService.getDepartments()
        .pipe(first());

    searchValue: BehaviorSubject<string> = new BehaviorSubject('');
    searchValue$ = this.searchValue.asObservable();

    filteredDepartments$ = combineLatest([
        this.departments$,
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

    filterDepartments(event: { OriginalEvent: Event, query: string }): void {
        this.searchValue.next(event.query);
    }

    saveChanges(): void {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: 'Once these changes are submitted, they cannot be changed! Are you sure?',
            accept: () => {
                const examination: Partial<IExamination> = {
                    ...this.generalInfoForm.getRawValue(),
                    IsSubmitted: true
                }

                this.examinationService.updateExamination(examination)
                    .subscribe()
            },
            reject: () => {

            }
        });

    }

    ngOnInit(): void {
        this.examinationService.getExamination()
            .pipe(
                first(),
                tap(examination => {
                    this.generalInfoForm = new FormGroup({
                        ExaminationDate: new FormControl(new Date(examination.ExaminationDate.seconds * 1000)),
                        Department: new FormControl(examination.Department),
                        IsCovidExamination: new FormControl(examination.IsCovidExamination)
                    });
                })
            )
            .subscribe()

    }
}
