import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, SelectItem } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { BLOOD_TYPES } from 'src/app/shared/mock/mock-data';
import { IBloodType, IForeignPatientType, IGender } from 'src/app/shared/models/mock-data/mock-data';
import { IPatient } from 'src/app/shared/models/patient/patient.model';
import { MockDataService } from 'src/app/shared/services/mock-data/mock-data.service';

import * as moment from 'moment';
import { v4 } from 'uuid'

@Component({
    selector: 'app-new-patient',
    templateUrl: './new-patient.component.html',
    styleUrls: ['./new-patient.component.scss'],
})
export class NewPatientComponentnent {
    constructor(
        private angularFireStore: AngularFirestore,
        private angularFireStorage: AngularFireStorage,
        public router: Router,
        public mockService: MockDataService
    ) { }

    bloodTypes: Observable<IBloodType[]> = this.mockService.getBloodTypes()
    genderTypes: Observable<IGender[]> = this.mockService.getGender();
    foreignPatientTypes: Observable<IForeignPatientType[]> = this.mockService.getForeignPatientTypes();

    uploadedFile: any = null;
    msgs: Message[] = [];

    newPatientForm: FormGroup = new FormGroup({
        FirstName: new FormControl('', [Validators.required]),
        LastName: new FormControl('', [Validators.required]),
        PersonalNo: new FormControl('', [Validators.required]),
        IDnumber: new FormControl('', [Validators.required]),
        Gender: new FormControl(null, [Validators.required]),

        FatherName: new FormControl('', [Validators.required]),
        MotherName: new FormControl('', [Validators.required]),
        Nationality: new FormControl('', [Validators.required]),
        PlaceOfBirth: new FormControl('', [Validators.required]),
        Country: new FormControl('', [Validators.required]),

        InsuranceUntil: new FormControl(null, [Validators.required]),

        DateOfBirth: new FormControl(null, [Validators.required]),
        BloodType: new FormControl(null, [Validators.required]),

        ForeignPatient: new FormControl('', [Validators.required]),
        Passport: new FormControl('', [Validators.required]),

        Address: new FormControl('', [Validators.required]),
        Email: new FormControl(''),
        Phone: new FormControl(''),
    });

    onSave() {
        let errorMessage: string = '';

        if (!this.newPatientForm.valid) {
            errorMessage = 'Please fill the required fields!';
            this.showVlidationError(errorMessage);
            return;
        }

        const randomId = v4();

        let newPatient: IPatient = this.newPatientForm.getRawValue();

        this.angularFireStorage.upload(randomId, this.uploadedFile)
            .then(uploadedSnapshot => {
                newPatient.ImageUrl = uploadedSnapshot.ref.fullPath

                this.angularFireStore
                    .collection<IPatient>('patients')
                    .add(newPatient)
                    .then((dataRef) => {
                        this.router.navigate([`/main/patient-profile/${dataRef.id}`]);
                    })
                    .catch(() => {
                        errorMessage = 'Server error! Try again.';
                        this.showVlidationError(errorMessage);
                        return;
                    });
            })

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

    ngOnInit() {
        this.newPatientForm.controls.DateOfBirth.valueChanges
            .pipe(
                tap(d => console.log(d))
            )
            .subscribe()
    }
}
