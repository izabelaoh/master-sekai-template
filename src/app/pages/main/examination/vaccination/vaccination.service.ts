import { Injectable } from '@angular/core';
import { IVacination } from 'src/app/shared/models/examinations/examinations.model';

@Injectable({ providedIn: 'root' })
export class VaccinationService {
    constructor() { }

    private vaccination: IVacination = null;


}
