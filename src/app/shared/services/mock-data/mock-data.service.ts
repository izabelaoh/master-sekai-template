import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BLOOD_TYPES, FOREIGN_PATIENT, GENDER_TYPES } from '../../mock/mock-data';
import { IBloodType, IForeignPatientType, IGender } from '../../models/mock-data/mock-data';

@Injectable({ providedIn: 'root' })
export class MockDataService {
    constructor() { }

    getBloodTypes(): Observable<IBloodType[]> {
        return of(BLOOD_TYPES)
    }

    getGender(): Observable<IGender[]> {
        return of(GENDER_TYPES);
    }

    getForeignPatientTypes(): Observable<IForeignPatientType[]> {
        return of(FOREIGN_PATIENT)
    }
}
