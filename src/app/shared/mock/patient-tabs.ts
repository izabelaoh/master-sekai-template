import { ITabs } from "../models/general/components";

export const PATIENT_TABS: ITabs[] = [
    { label: 'Patient Profile', routerLink: 'personal' },
    { label: 'New Examination', routerLink: 'new-examination' },
    { label: 'General Examinations', routerLink: 'examinations' },
    { label: 'COVID-19 Examinations', routerLink: 'covid-examinations' },
]
