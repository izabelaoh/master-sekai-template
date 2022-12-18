import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of, Subject } from 'rxjs';
import { IDepartment, IDiagnose, IDiagnoseModel, IExamination } from '../../models/examinations/examinations.model';

@Injectable({ providedIn: 'root' })
export class ExaminationService {
    constructor(
        private http: HttpClient,
        private angularFireStore: AngularFirestore,
    ) { }

    private EXAMINATIONS_BY_PATIENT: { [key: string]: IExamination[] } = {}

    setExamination(examination: IExamination): void {

    }

    getExamination(): void {

    }

    createExamination(examination: Partial<IExamination>): Observable<string> {
        const examinationSubject: Subject<string> = new Subject();
        const examinationSubject$ = examinationSubject.asObservable();

        this.angularFireStore
            .collection<Partial<IExamination>>('examinations')
            .add(examination)
            .then((dataRef) => {
                examinationSubject.next(dataRef.id);
            })

        return examinationSubject$;
    }

    getNewExamination(patientId: string): Observable<IExamination> {
        return of({
            PatientId: patientId,
            Department: null,
            ExaminationDate: new Date(),
            Diagnoses: [],
            Therapies: [],
            Vaccinations: [],
            IsCovidExamination: false
        } as IExamination)
    }

    getDepartments(): Observable<IDepartment[]> {
        return this.http.get('/assets/data/departments.json')
            .pipe(
                map((data: IDepartment[]) => {
                    return data.map(d => {
                        return {
                            name: d.name,
                            code: d.code
                        }
                    })
                })
            )
    }

    getDiagnoses(): Observable<IDiagnose[]> {
        return this.http.get('/assets/data/diagnoses.json')
            .pipe(
                map((data: IDiagnoseModel[]) => {
                    return data.map(d => {
                        return {
                            name: d.laytext.length > 50 ? `${d.laytext.substring(0, 50)}...` : d.laytext,
                            code: d.ICD10
                        }
                    })
                })
            )
    }
}
