import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../../api/product';
import { ProductService } from '../../../service/productservice';
import { map, Observable, Subscription } from 'rxjs';
import { ConfigService } from '../../../service/app.config.service';
import { AppConfig } from '../../../api/appconfig';
import { ExaminationService } from 'src/app/shared/services/examinations/examination.service';
import { IExamination } from 'src/app/shared/models/examinations/examinations.model';

import * as moment from 'moment'
import { PatientService } from 'src/app/shared/services/patient/patient.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    constructor(
        private examinationsService: ExaminationService,
        private patientsService: PatientService,
        private router: Router
    ) { }

    allExaminations$: Observable<{ todayNew: number, total: number }> = this.examinationsService.getAllExaminations()
        .pipe(
            map(examinations => {
                const today = moment();
                const newExaminationsToday = examinations.filter(examination => {
                    const examDate = moment(examination.ExaminationDate.seconds * 1000);
                    return today.isSame(examDate, 'd')
                })

                return {
                    todayNew: newExaminationsToday.length,
                    total: examinations.length
                }
            })

        );

    covidExaminations$: Observable<{ todayNew: number, total: number }> = this.examinationsService.getAllCovidExaminations()
        .pipe(
            map(examinations => {
                const today = moment();
                const newExaminationsToday = examinations.filter(examination => {
                    const examDate = moment(examination.ExaminationDate.seconds * 1000);
                    return today.isSame(examDate, 'd')
                })

                return {
                    todayNew: newExaminationsToday.length,
                    total: examinations.length
                }
            })

        );

    recoveredPatients$: Observable<number> = this.patientsService.getRecoveredPatients();

    deceasedPatients$: Observable<number> = this.patientsService.getDeceasedPatients();

    recentExaminations$: Observable<IExamination[]> = this.examinationsService.getRecentExaminations();

    viewExamination(examination: IExamination): void {
        this.examinationsService.setExamination(examination);

        setTimeout(() => {
            this.router.navigate([`/main/patient-profile/${examination.PatientId}/new-examination/${examination.Id}`]);
        }, 100)
    }

    ngOnInit() {

    }
}
