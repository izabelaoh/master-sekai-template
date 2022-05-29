import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
@Component({
    selector: 'app-new-patient',
    templateUrl: './newPatient.component.html',
})
export class NewPatientComponentnent {
    constructor(
        private angularFireStore: AngularFirestore,
        public router: Router
    ) {}
    bloodTypes: SelectItem[];
    genderTypes: SelectItem[];
    foreignPatientTypes: SelectItem[];

    newPatientForm: FormGroup = new FormGroup({
        FirstName: new FormControl('', [Validators.required]),
        LastName: new FormControl('', [Validators.required]),
        PersonalNo: new FormControl('', [Validators.required]),
        IDnumber: new FormControl('', [Validators.required]),
        Gender: new FormControl(null, [Validators.required]),

        FatherName: new FormControl('', [Validators.required]),
        MatherName: new FormControl('', [Validators.required]),
        Nationality: new FormControl('', [Validators.required]),
        PlaceOfBirth: new FormControl('', [Validators.required]),
        Country: new FormControl('', [Validators.required]),

        DateOfBirth: new FormControl(null, [Validators.required]),
        BloodType: new FormControl(null, [Validators.required]),
        ForeignPatient: new FormControl('', [Validators.required]),

        Address: new FormControl('', [Validators.required]),
        Email: new FormControl('', [Validators.required]),
        Phone: new FormControl('', [Validators.required]),
    });
    onSubmit() {
        if (this.newPatientForm.invalid) {
            console.log('All fields are required');
            return;
        }

        let newPatient = this.newPatientForm.getRawValue();

        this.angularFireStore
            .collection('patients')
            .add(newPatient)
            .then((dataRef) => {
                let patientId = dataRef.id;

                this.router.navigate([`/main/patient-profile/${patientId}`]);
            })
            .catch(() => {
                console.log('Server error! Try again.');
            });
    }
    onCancel() {}
    ngOnInit() {
        this.bloodTypes = [
            {
                label: 'A+',
                value: { id: 1, name: 'A+', code: 'А' },
            },
            {
                label: 'A-',
                value: { id: 2, name: 'A-', code: 'А-' },
            },
            {
                label: 'B+',
                value: { id: 3, name: 'B+', code: 'B+' },
            },
            {
                label: 'B-',
                value: { id: 4, name: 'B-', code: 'B-' },
            },
            {
                label: 'О+',
                value: { id: 5, name: 'O+', code: 'O+' },
            },
            {
                label: 'O-',
                value: { id: 6, name: 'O-', code: 'O-' },
            },
            {
                label: 'AB+',
                value: { id: 7, name: 'AB+', code: 'AB+' },
            },
            {
                label: 'AB-',
                value: { id: 8, name: 'AB-', code: 'AB-' },
            },
        ];
        this.genderTypes = [
            {
                label: 'Female',
                value: { id: 1, name: 'female', code: 'female' },
            },
            {
                label: 'Male',
                value: { id: 2, name: 'male', code: 'male' },
            },
        ];
        this.foreignPatientTypes = [
            {
                label: 'Yes',
                value: { id: 1, name: 'yes', code: 'yes' },
            },
            {
                label: 'No',
                value: { id: 2, name: 'no', code: 'no' },
            },
        ];
    }
}
