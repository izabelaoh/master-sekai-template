import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map, Observable, tap } from 'rxjs';
import { IExamination } from 'src/app/shared/models/examinations/examinations.model';
import { ExaminationService } from 'src/app/shared/services/examinations/examination.service';

import * as moment from 'moment'

@Component({
    selector: 'app-examinations',
    templateUrl: './examinations.component.html',
    styleUrls: ['./examinations.component.scss']
})
export class ExaminationsComponent implements OnInit {

    constructor(
        private examinationService: ExaminationService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    private patientId: string = this.activatedRoute.parent.snapshot.paramMap.get('id');
    generalExaminations$: Observable<IExamination[]> = this.examinationService.getAllExaminationsForPatient(this.patientId)

    viewExamination(examination: IExamination): void {
        this.examinationService.setExamination(examination);

        setTimeout(() => {
            this.router.navigate([`/main/patient-profile/${this.patientId}/new-examination/${examination.Id}`])
        }, 100)
    }

    ngOnInit(): void {

    }

}
