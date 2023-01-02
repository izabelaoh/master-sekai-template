import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first, map, Observable, tap } from 'rxjs';
import { IMeasurements } from 'src/app/shared/models/examinations/examinations.model';
import { ExaminationService } from 'src/app/shared/services/examinations/examination.service';

@Component({
    selector: 'app-measurements',
    templateUrl: './measurements.component.html',
    styleUrls: ['./measurements.component.scss']
})
export class MeasurementsComponent implements OnInit {

    constructor(
        private examinationService: ExaminationService,
        private activatedRoute: ActivatedRoute
    ) { }

    measurementsForm: FormGroup;

    addedMeasurements$: Observable<IMeasurements> = this.examinationService.getExamination()
        .pipe(
            first(),
            map(examination => examination.Measurements)
        )

    saveMeasurements(): void {
        const measurements: IMeasurements = this.measurementsForm.getRawValue();
        const examinationId: string = this.activatedRoute.snapshot.paramMap.get('examinationId')

        this.examinationService.updateMeasurements(measurements, examinationId)
            .subscribe()
    }

    ngOnInit(): void {
        this.examinationService.getExamination()
            .pipe(
                first(),
                tap(examination => {
                    this.measurementsForm = new FormGroup({
                        bodyMeasurements: new FormGroup({
                            weight: new FormControl(examination?.Measurements?.bodyMeasurements?.weight),
                            height: new FormControl(examination?.Measurements?.bodyMeasurements?.height),
                            temperature: new FormControl(examination?.Measurements?.bodyMeasurements?.temperature),
                        }),
                        bloodTest: new FormGroup({
                            wbcs: new FormControl(examination?.Measurements?.bloodTest?.wbcs),
                            neitrophils: new FormControl(examination?.Measurements?.bloodTest?.neitrophils),
                            lymphocytes: new FormControl(examination?.Measurements?.bloodTest?.lymphocytes),
                            monocytes: new FormControl(examination?.Measurements?.bloodTest?.monocytes),
                            eosinophils: new FormControl(examination?.Measurements?.bloodTest?.eosinophils),
                            basophiles: new FormControl(examination?.Measurements?.bloodTest?.basophiles),
                            rbcs: new FormControl(examination?.Measurements?.bloodTest?.rbcs),
                            hb: new FormControl(examination?.Measurements?.bloodTest?.hb),
                            hematocrit: new FormControl(examination?.Measurements?.bloodTest?.hematocrit),
                            platelets: new FormControl(examination?.Measurements?.bloodTest?.platelets)
                        })
                    })

                    console.log(this.measurementsForm)
                })
            )
            .subscribe()
    }

}
