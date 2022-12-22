export interface IExamination {
    Id?: string;
    PatientId?: string;
    ExaminationDate: any;
    Department: string;
    IsCovidExamination: boolean;
    Diagnoses: IDiagnose[];
    Therapies: ITherapy[];
    Vaccinations: IVacination[]
}

export interface IDiagnoseModel {
    disease: string;
    name: string;
    text: string;
    laytext: string;
    category: string;
    alias: string;
    wiki: string;
    IsRare: boolean;
    IsGenderSpecific: boolean;
    IsImmLifeThreatening: boolean;
    IsCantMiss: boolean;
    wiki2: string;
    wiki3: string;
    wiki4: string;
    ICD10: string;
    LOINC: string;
}

export interface ITherapyModel {
    interactionConcept: {
        minConceptItem: {
            rxcui: string;
            name: string;
            tty: string;
        },
        sourceConceptItem: {
            id: string;
            name: string;
            url: string;
        }
    }[],
    severity: string;
    description: string;
}

export interface IDiagnose {
    code: string;
    name: string;
}

export interface ITherapy {
    code: string;
    name: string;
    amount?: string;
}

export interface IVacination { }

export interface IDepartment {
    name: string;
    code: string;
}
