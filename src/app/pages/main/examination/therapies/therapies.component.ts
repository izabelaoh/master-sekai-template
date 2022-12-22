import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, combineLatest, first, map, tap } from 'rxjs';
import { ITherapy } from 'src/app/shared/models/examinations/examinations.model';
import { ExaminationService } from 'src/app/shared/services/examinations/examination.service';

@Component({
    selector: 'app-therapies',
    templateUrl: './therapies.component.html',
    styleUrls: ['./therapies.component.scss'],
    providers: [ConfirmationService]
})
export class TherapiesComponent implements OnInit {

    constructor(
        private examinationService: ExaminationService,
        private activatedRoute: ActivatedRoute,
        private confirmationService: ConfirmationService
    ) { }

    addMode: boolean = false;
    therapyForm: FormGroup = new FormGroup({
        Therapy: new FormControl(null),
        Amount: new FormControl(null),
    })

    therapies$ = this.examinationService.getTherapies()
        .pipe(first());

    addedTherapies$ = this.examinationService.getExamination()
        .pipe(
            map(examination => examination.Therapies)
        )

    searchValue: BehaviorSubject<string> = new BehaviorSubject('');
    searchValue$ = this.searchValue.asObservable();

    filteredTherapies$ = combineLatest([
        this.therapies$,
        this.searchValue$
    ])
        .pipe(
            map(data => {
                const [therapies, searchValue] = data;

                return therapies.filter(d => {
                    if (!searchValue) return true;

                    return d.name.toLowerCase().includes(searchValue.toLowerCase());
                })
            })
        )

    filterTherapies(event: { OriginalEvent: Event, query: string }): void {
        this.searchValue.next(event.query);
    }

    addNewTherapy(): void {
        this.addMode = true;
    }

    removeTherapy(therapy: ITherapy): void {
        this.confirmationService.confirm({
            key: 'confirm2',
            target: event.target,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.examinationService.removeTherapyFromExamination(therapy)
                    .subscribe()
            },
            reject: () => {

            }
        });
    }

    submitNewTherapy(): void {
        const examinationId: string = this.activatedRoute.snapshot.paramMap.get('examinationId')

        const formData = this.therapyForm.getRawValue();
        const therapy: ITherapy = {
            name: formData.Therapy.name,
            code: formData.Therapy.code,
            amount: formData.Amount
        };

        if (!therapy) return;
        if (therapy && !therapy.name && !therapy.amount) return;

        this.examinationService.addTherapyToExamination(therapy, examinationId)
            .pipe(
                first(),
                tap(() => {
                    this.therapyForm.reset();
                })
            )
            .subscribe()
    }

    ngOnInit(): void {
    }

}
