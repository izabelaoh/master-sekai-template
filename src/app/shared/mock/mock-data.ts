import { IBloodType, IForeignPatientType, IGender } from "../models/mock-data/mock-data";

export const BLOOD_TYPES: IBloodType[] = [
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
]

export const GENDER_TYPES: IGender[] = [
    {
        label: 'Female',
        value: { id: 1, name: 'female', code: 'female' },
    },
    {
        label: 'Male',
        value: { id: 2, name: 'male', code: 'male' },
    },
]

export const FOREIGN_PATIENT: IForeignPatientType[] = [
    {
        label: 'Yes',
        value: { id: 1, name: 'yes', code: 'yes' },
    },
    {
        label: 'No',
        value: { id: 2, name: 'no', code: 'no' },
    },
]
