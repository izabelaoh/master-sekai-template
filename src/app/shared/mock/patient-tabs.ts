import { ITabs } from "../models/general/components";

export const PATIENT_TABS: ITabs[] = [
    { label: 'Patient Profile', routerLink: 'personal' },
    { label: 'General Examinations', routerLink: 'examinations' },
    { label: 'COVID-19 Examinations', routerLink: 'covid-examinations' },
]
