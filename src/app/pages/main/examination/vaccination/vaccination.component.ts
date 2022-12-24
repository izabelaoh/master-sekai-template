import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { first, map, BehaviorSubject, combineLatest, tap } from 'rxjs';
import { IDiagnose, IVacination } from 'src/app/shared/models/examinations/examinations.model';
import { ExaminationService } from 'src/app/shared/services/examinations/examination.service';

import * as moment from 'moment';

@Component({
    selector: 'app-vaccination',
    templateUrl: './vaccination.component.html',
    styleUrls: ['./vaccination.component.scss'],
    providers: [ConfirmationService]
})
export class VaccinationComponent implements OnInit {
    constructor(
        private examinationService: ExaminationService,
        private activatedRoute: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private router: Router
    ) { }

    routeItems = [
        { label: 'Vaccine Type', routerLink: 'vaccination-type' },
        { label: 'Information', routerLink: 'vaccination-info' },
        { label: 'Vaccination', routerLink: 'vaccination' },
        { label: 'Confirmation', routerLink: 'vaccination-confirmation' },
    ];

    addMode: boolean = false;
    vaccineForm: FormGroup = new FormGroup({
        Vaccine: new FormControl(null),
        Date: new FormControl(new Date())
    })

    vaccines$ = this.examinationService.getVaccines()
        .pipe(first());

    addedVaccinations$ = this.examinationService.getExamination()
        .pipe(
            map(examination => {
                return examination.Vaccinations.map(vac => {
                    return {
                        ...vac,
                    }
                })
            })
        )

    searchValue: BehaviorSubject<string> = new BehaviorSubject('');
    searchValue$ = this.searchValue.asObservable();

    filteredVaccines$ = combineLatest([
        this.vaccines$,
        this.searchValue$
    ])
        .pipe(
            map(data => {
                const [vaccine, searchValue] = data;

                return vaccine.filter(d => {
                    if (!searchValue) return true;

                    return d.name.toLowerCase().includes(searchValue.toLowerCase());
                })
            })
        )

    formatDate(date: any): string {
        return moment(date.seconds * 1000).format('DD.MM.YYYY')
    }

    filterVaccines(event: { OriginalEvent: Event, query: string }): void {
        this.searchValue.next(event.query);
    }

    addNewVaccine(): void {
        this.addMode = true;
    }

    removeVaccine(vaccination: IVacination): void {
        this.confirmationService.confirm({
            key: 'confirm2',
            target: event.target,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.examinationService.removeVaccinationFromExamination(vaccination)
                    .subscribe()
            },
            reject: () => {

            }
        });
    }

    submitNewVaccination(): void {
        const examinationId: string = this.activatedRoute.snapshot.paramMap.get('examinationId')

        const formData = this.vaccineForm.getRawValue();

        const loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));


        const vaccine: IVacination = {
            code: formData.Vaccine.code,
            name: formData.Vaccine.name,
            date: formData.Date,
            performedBy: loggedUser.additionalUserInfo.username
        }

        if (!vaccine) return;
        if (vaccine && (!vaccine.name || !vaccine.date)) return;

        this.examinationService.addVaccinationToExamination(vaccine, examinationId)
            .pipe(
                first(),
                tap(() => {
                    this.vaccineForm.reset();
                })
            )
            .subscribe()
    }

    ngOnInit(): void {
    }

}
