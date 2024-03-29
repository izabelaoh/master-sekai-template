import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { concat, concatMap, first, map, observable, Observable, of, shareReplay, Subject, tap } from 'rxjs';
import { IDepartment, IDiagnose, IDiagnoseModel, IExamination, IMeasurements, ITherapy, ITherapyModel, IVaccineModel, IVacination } from '../../models/examinations/examinations.model';

import { arrayUnion, arrayRemove } from '@angular/fire/firestore'

@Injectable({ providedIn: 'root' })
export class ExaminationService {
    constructor(
        private http: HttpClient,
        private angularFireStore: AngularFirestore,
    ) { }

    private currentExamination: Subject<IExamination> = new Subject();
    private currentExamination$ = this.currentExamination.asObservable()
        .pipe(
            shareReplay(1)
        );

    setExamination(examination: IExamination): void {
        this.currentExamination.next(examination);
    }

    getExamination(): Observable<IExamination> {
        return this.currentExamination$;
    }

    updateExamination(updatedExamination: Partial<IExamination>): Observable<IExamination> {
        return this.getExamination()
            .pipe(
                concatMap(examination => {
                    return new Observable(observer => {
                        this.angularFireStore
                            .collection<Partial<IExamination>>('examinations')
                            .doc(examination.Id)
                            .update({
                                ...updatedExamination
                            })
                            .then(() => observer.next(true))
                            .catch((err) => observer.next(false))
                    })
                        .pipe(
                            concatMap(() => this.getExaminationAsync(examination.Id))
                        );
                })
            )
    }

    createExamination(examination: Partial<IExamination>): Observable<string> {
        const examinationSubject: Subject<string> = new Subject();
        const examinationSubject$ = examinationSubject.asObservable();

        this.angularFireStore
            .collection<Partial<IExamination>>('examinations')
            .add(examination)
            .then((dataRef) => {
                this.angularFireStore
                    .collection<IExamination>('examinations')
                    .doc(dataRef.id)
                    .ref.get()
                    .then(snapshot => {
                        let examination = snapshot.data();
                        examination.Id = snapshot.id;

                        this.setExamination(examination);

                        examinationSubject.next(dataRef.id);
                    })
            })

        return examinationSubject$;
    }

    getExaminationAsync(examinationId: string): Observable<IExamination> {
        return this.angularFireStore
            .collection<IExamination>('examinations')
            .doc(examinationId)
            .get()
            .pipe(
                map(snapshot => {
                    let examination = snapshot.data();
                    examination.Id = snapshot.id;

                    this.setExamination(examination);
                    return examination;
                })
            )
    }

    addDiagnoseToExamination(diagnose: IDiagnose, examinationId: string): Observable<IExamination> {
        return new Observable(observer => {
            this.angularFireStore
                .collection<Partial<IExamination>>('examinations')
                .doc(examinationId)
                .update({
                    Diagnoses: arrayUnion(diagnose) as any
                })
                .then(() => observer.next(true))
                .catch(() => observer.next(false))
        })
            .pipe(
                concatMap(() => this.getExaminationAsync(examinationId))
            );
    }

    addVaccinationToExamination(vaccination: IVacination, examinationId: string): Observable<IExamination> {
        return new Observable(observer => {
            this.angularFireStore
                .collection<Partial<IExamination>>('examinations')
                .doc(examinationId)
                .update({
                    Vaccinations: arrayUnion(vaccination) as any
                })
                .then(() => observer.next(true))
                .catch(() => observer.next(false))
        })
            .pipe(
                concatMap(() => this.getExaminationAsync(examinationId))
            );
    }

    addTherapyToExamination(therapy: ITherapy, examinationId: string): Observable<IExamination> {
        return new Observable(observer => {
            this.angularFireStore
                .collection<Partial<IExamination>>('examinations')
                .doc(examinationId)
                .update({
                    Therapies: arrayUnion(therapy) as any
                })
                .then(() => observer.next(true))
                .catch(() => observer.next(false))
        })
            .pipe(
                concatMap(() => this.getExaminationAsync(examinationId))
            );
    }

    updateMeasurements(measurements: IMeasurements, examinationId: string): Observable<IExamination> {
        return new Observable(observer => {
            this.angularFireStore
                .collection<Partial<IExamination>>('examinations')
                .doc(examinationId)
                .update({
                    Measurements: measurements
                })
                .then(() => observer.next(true))
                .catch(() => observer.next(false))
        })
            .pipe(
                concatMap(() => this.getExaminationAsync(examinationId))
            );
    }

    removeDiagnoseFromExamination(diagnose: IDiagnose): Observable<IExamination> {
        return this.getExamination()
            .pipe(
                concatMap(examination => {
                    return new Observable(observer => {
                        this.angularFireStore
                            .collection<Partial<IExamination>>('examinations')
                            .doc(examination.Id)
                            .update({
                                Diagnoses: arrayRemove(diagnose) as any
                            })
                            .then(() => observer.next(true))
                            .catch((err) => observer.next(false))
                    })
                        .pipe(
                            concatMap(() => this.getExaminationAsync(examination.Id))
                        );
                })
            )
    }

    removeVaccinationFromExamination(vaccine: IVacination): Observable<IExamination> {
        return this.getExamination()
            .pipe(
                concatMap(examination => {
                    return new Observable(observer => {
                        this.angularFireStore
                            .collection<Partial<IExamination>>('examinations')
                            .doc(examination.Id)
                            .update({
                                Vaccinations: arrayRemove(vaccine) as any
                            })
                            .then(() => observer.next(true))
                            .catch((err) => observer.next(false))
                    })
                        .pipe(
                            concatMap(() => this.getExaminationAsync(examination.Id))
                        );
                })
            )
    }

    removeTherapyFromExamination(therapy: ITherapy): Observable<IExamination> {
        return this.getExamination()
            .pipe(
                concatMap(examination => {
                    return new Observable(observer => {
                        this.angularFireStore
                            .collection<Partial<IExamination>>('examinations')
                            .doc(examination.Id)
                            .update({
                                Therapies: arrayRemove(therapy) as any
                            })
                            .then(() => observer.next(true))
                            .catch(() => observer.next(false))
                    })
                        .pipe(
                            concatMap(() => this.getExaminationAsync(examination.Id))
                        );
                })
            )
    }

    getAllExaminationsForPatient(patientId: string, isCovidExamination: boolean = false): Observable<IExamination[]> {
        return new Observable(observer => {
            this.angularFireStore
                .collection<Partial<IExamination>>('examinations', ref => ref.where('PatientId', '==', patientId).where('IsCovidExamination', '==', isCovidExamination))
                .get()
                .pipe(
                    first(),
                    tap(data => {
                        const examinations: IExamination[] = [];

                        data.forEach(item => {
                            examinations.push({
                                ...item.data(),
                                Id: item.id
                            } as IExamination)
                        })

                        observer.next(examinations)
                    })
                )
                .subscribe()
        })
    }

    getBaseNewExaminationModel(patientId: string): Observable<IExamination> {
        const loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));

        return of({
            PatientId: patientId,
            Department: null,
            ExaminationDate: new Date(),
            Diagnoses: [],
            Therapies: [],
            Vaccinations: [],
            IsCovidExamination: false,
            Doctor: loggedUser.additionalUserInfo.username,
            IsSubmitted: false
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

    getVaccines(): Observable<IDiagnose[]> {
        return this.http.get('/assets/data/vaccines.json')
            .pipe(
                map((data: IVaccineModel[]) => {
                    return data.map(v => {
                        return {
                            name: v.name,
                            code: v.code
                        }
                    })
                })
            )
    }

    getTherapies(): Observable<ITherapy[]> {
        return this.http.get('/assets/data/therapies.json')
            .pipe(
                map((data: ITherapyModel[]) => {
                    return data.reduce((acc, curr, ind, arr) => {
                        return [
                            ...acc,
                            ...curr.interactionConcept.map(concept => {
                                return {
                                    code: concept.sourceConceptItem.id,
                                    name: concept.sourceConceptItem.name
                                } as ITherapy
                            })
                        ];
                    }, [])

                    // return data.map(d => {
                    //     return {
                    //         name: d.laytext.length > 50 ? `${d.laytext.substring(0, 50)}...` : d.laytext,
                    //         code: d.ICD10
                    //     }
                    // })
                })
            )
    }

    getAllExaminations(): Observable<IExamination[]> {
        return new Observable(observer => {
            this.angularFireStore
                .collection<Partial<IExamination>>('examinations')
                .get()
                .pipe(
                    first(),
                    tap(data => {
                        const examinations: IExamination[] = [];

                        data.forEach(item => {
                            examinations.push({
                                ...item.data(),
                                Id: item.id
                            } as IExamination)
                        })

                        observer.next(examinations)
                    })
                )
                .subscribe()
        })
    }

    getAllCovidExaminations(): Observable<IExamination[]> {
        return new Observable(observer => {
            this.angularFireStore
                .collection<Partial<IExamination>>('examinations', ref => ref.where('IsCovidExamination', '==', true))
                .get()
                .pipe(
                    first(),
                    tap(data => {
                        const examinations: IExamination[] = [];

                        data.forEach(item => {
                            examinations.push({
                                ...item.data(),
                                Id: item.id
                            } as IExamination)
                        })

                        observer.next(examinations)
                    })
                )
                .subscribe()
        })
    }

    getRecentExaminations(): Observable<IExamination[]> {
        return new Observable(observer => {
            this.angularFireStore
                .collection<Partial<IExamination>>('examinations', ref => ref.orderBy('ExaminationDate', 'desc').limit(10))
                .get()
                .pipe(
                    first(),
                    tap(data => {
                        const examinations: IExamination[] = [];

                        data.forEach(item => {
                            examinations.push({
                                ...item.data(),
                                Id: item.id
                            } as IExamination)
                        })

                        observer.next(examinations)
                    })
                )
                .subscribe()
        })
    }
}
