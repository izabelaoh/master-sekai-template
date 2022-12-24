import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { ExaminationService } from 'src/app/shared/services/examinations/examination.service';
import { VaccinationService } from '../vaccination.service';

@Component({
    selector: 'app-vaccination-type',
    templateUrl: './vaccination-type.component.html',
    styleUrls: ['./vaccination-type.component.scss']
})
export class VaccinationTypeComponent implements OnInit {

    constructor(
        private examinationService: ExaminationService,
        private vaccinationService: VaccinationService
    ) { }

    vaccineTypes$ = this.examinationService.getVaccines()
        .pipe(
            first()
        )

    ngOnInit(): void {
    }

}
