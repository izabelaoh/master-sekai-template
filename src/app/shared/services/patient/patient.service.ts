import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, filter, first, firstValueFrom, map, Observable, of, Subject, tap } from 'rxjs';
import { IPatient } from '../../models/patient/patient.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ITabs } from '../../models/general/components';
import { PATIENT_TABS } from '../../mock/patient-tabs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({ providedIn: 'root' })
export class PatientService {
    constructor(
        private angularFireStore: AngularFirestore,
        private angularFireStorage: AngularFireStorage,
    ) { }

    private currentPatientSubject: BehaviorSubject<IPatient> = new BehaviorSubject(null);
    private currentPatient$ = this.currentPatientSubject.asObservable();

    updatePatient(updatedPatient: Partial<IPatient>): Observable<IPatient> {
        return this.getPatient()
            .pipe(
                concatMap(patient => {
                    return new Observable(observer => {
                        this.angularFireStore
                            .collection<Partial<IPatient>>('patients')
                            .doc(patient.Id)
                            .update({
                                ...updatedPatient
                            })
                            .then(() => observer.next(true))
                            .catch((err) => observer.next(false))
                    })
                        .pipe(
                            concatMap(() => this.getPatientAsync(patient.Id))
                        );
                })
            )
    }

    getAllPatients(): Observable<IPatient[]> {
        const patients: Subject<IPatient[]> = new Subject();
        const patients$ = patients.asObservable();

        this.angularFireStore
            .collection<IPatient>('patients')
            .ref.get()
            .then(docs => {
                let patientsList: IPatient[] = []
                docs.forEach(doc => {
                    patientsList = [
                        ...patientsList,
                        {
                            ...doc.data(),
                            Id: doc.id
                        }
                    ]
                })

                patients.next(patientsList)
            })

        return patients$
    }

    getPatientAsync(id: string): Observable<IPatient> {
        return new Observable(observer => {
            this.angularFireStore
                .collection<IPatient>('patients')
                .doc(id)
                .ref.get()
                .then(doc => {
                    let patient = doc.data();
                    const urlPromise = firstValueFrom(this.angularFireStorage.ref(`${doc.data().ImageUrl}`)
                        .getDownloadURL())

                    urlPromise
                        .then(url => {
                            patient.ImageUrl = url;
                            patient.Id = doc.id;

                            this.setPatient(patient);
                            console.log(patient)

                            observer.next(patient)
                        })
                })
        })
    }

    getPatientTabs(): Observable<ITabs[]> {
        return of(PATIENT_TABS)
    }

    getPatient(): Observable<IPatient> {
        return this.currentPatient$
            .pipe(
                filter(patient => !!patient),
                map(patient => {
                    const isValidInsurance: boolean = new Date().getTime() < (patient.InsuranceUntil.seconds * 1000)

                    return {
                        ...patient,
                        DateOfBirth: new Date(patient.DateOfBirth.seconds * 1000),
                        InsuranceUntil: new Date(patient.InsuranceUntil.seconds * 1000),
                        IsValidInsurance: isValidInsurance
                    }
                })
            );
    }

    getRecoveredPatients(): Observable<number> {
        return new Observable(observer => {
            this.angularFireStore
                .collection<Partial<IPatient>>('patients', ref => ref.where('IsCovidRecovered', '==', true))
                .get()
                .pipe(
                    first(),
                    tap(data => {
                        observer.next(data.size)
                    })
                )
                .subscribe()
        })
    }

    getDeceasedPatients(): Observable<number> {
        return new Observable(observer => {
            this.angularFireStore
                .collection<Partial<IPatient>>('patients', ref => ref.where('IsCovidDeceased', '==', true))
                .get()
                .pipe(
                    first(),
                    tap(data => {
                        observer.next(data.size)
                    })
                )
                .subscribe()
        })
    }

    setPatient(patient: IPatient): void {
        this.currentPatientSubject.next(patient);
    }

    clearPatient(): void {
        this.currentPatientSubject.next(null);
    }
}
