import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, first, map } from 'rxjs';
import { ExaminationService } from 'src/app/shared/services/examinations/examination.service';

@Component({
    selector: 'app-general-info',
    templateUrl: './general-info.component.html',
    styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {

    @Input() examinationForm: FormGroup;

    constructor(
        private examinationService: ExaminationService
    ) { }

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

    ngOnInit(): void {
    }

}
