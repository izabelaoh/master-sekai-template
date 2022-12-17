import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { filter, first, Observable, tap } from 'rxjs';
import { IBloodType, IForeignPatientType, IGender } from 'src/app/shared/models/mock-data/mock-data';
import { IPatient } from 'src/app/shared/models/patient/patient.model';
import { MockDataService } from 'src/app/shared/services/mock-data/mock-data.service';
import { PatientService } from 'src/app/shared/services/patient/patient.service';

@Component({
    selector: 'app-edit-patient',
    templateUrl: './edit-patient.component.html',
    styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent implements OnInit {

    constructor(
        private angularFireStore: AngularFirestore,
        private angularFireStorage: AngularFireStorage,
        public router: Router,
        public mockService: MockDataService,
        private patientService: PatientService,
        private activatedRoute: ActivatedRoute
    ) { }

    bloodTypes: Observable<IBloodType[]> = this.mockService.getBloodTypes()
    genderTypes: Observable<IGender[]> = this.mockService.getGender();
    foreignPatientTypes: Observable<IForeignPatientType[]> = this.mockService.getForeignPatientTypes();

    uploadedFile: any = null;
    msgs: Message[] = [];

    newPatientForm: FormGroup;

    onEdit() {
        let errorMessage: string = '';

        if (!this.newPatientForm.valid) {
            errorMessage = 'Please fill the required fields!';
            this.showVlidationError(errorMessage);
            return;
        }

        let newPatientData: IPatient = this.newPatientForm.getRawValue();

        this.patientService.getPatient()
            .pipe(
                first(),
                tap(patient => {
                    this.angularFireStore
                        .collection<IPatient>('patients')
                        .doc(patient.Id)
                        .update(newPatientData)
                        .then((dataRef) => {
                            this.router.navigate([`/main/patient-profile/${patient.Id}`]);
                        })
                        .catch(() => {
                            errorMessage = 'Server error! Try again.';
                            this.showVlidationError(errorMessage);
                            return;
                        });
                })
            )
            .subscribe()

    }

    showVlidationError(message: string) {
        this.msgs = [];
        this.msgs.push({
            severity: 'error',
            summary: 'Error Message',
            detail: message,
        });
    }

    onUpload(data): void {
        this.uploadedFile = data.currentFiles[0];
        console.log(this.uploadedFile)
    }

    ngOnInit(): void {
        const patientId: string = this.activatedRoute.snapshot.paramMap.get('id');
        this.patientService.getPatientAsync(patientId);

        this.patientService.getPatient()
            .pipe(
                first(),
                tap(patient => {
                    console.log(patient)
                    this.newPatientForm = new FormGroup({
                        FirstName: new FormControl(patient.FirstName, [Validators.required]),
                        LastName: new FormControl(patient.LastName, [Validators.required]),
                        PersonalNo: new FormControl(patient.PersonalNo, [Validators.required]),
                        IDnumber: new FormControl(patient.IDnumber, [Validators.required]),
                        Gender: new FormControl(patient.Gender, [Validators.required]),

                        FatherName: new FormControl(patient.FatherName, [Validators.required]),
                        MotherName: new FormControl(patient.MotherName, [Validators.required]),
                        Nationality: new FormControl(patient.Nationality, [Validators.required]),
                        PlaceOfBirth: new FormControl(patient.PlaceOfBirth, [Validators.required]),
                        Country: new FormControl(patient.Country, [Validators.required]),

                        InsuranceUntil: new FormControl(patient.InsuranceUntil, [Validators.required]),

                        DateOfBirth: new FormControl(patient.DateOfBirth, [Validators.required]),
                        BloodType: new FormControl(patient.BloodType, [Validators.required]),
                        ForeignPatient: new FormControl(patient.ForeignPatient, [Validators.required]),
                        Passport: new FormControl(patient.Passport, [Validators.required]),
                        Address: new FormControl(patient.Address, [Validators.required]),
                        Email: new FormControl(patient.Email),
                        Phone: new FormControl(patient.Phone),
                    });
                })
            )
            .subscribe()
    }

}
