import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, first, map } from 'rxjs';
import { ExaminationService } from 'src/app/shared/services/examinations/examination.service';

@Component({
    selector: 'app-diagnoses',
    templateUrl: './diagnoses.component.html',
    styleUrls: ['./diagnoses.component.scss']
})
export class DiagnosesComponent implements OnInit {

    constructor(
        private examinationService: ExaminationService
    ) { }

    addMode: boolean = false;
    diagnosesForm: FormGroup = new FormGroup({
        Diagnose: new FormControl(null)
    })

    diagnoses$ = this.examinationService.getDiagnoses()
        .pipe(first());

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

    submitNewDiagnose(): void {
        console.log(this.diagnosesForm.getRawValue())
    }

    ngOnInit(): void {
    }

}
