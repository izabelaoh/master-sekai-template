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

export interface IDiagnose {
    name: string;
    code: string;
}

export interface ITherapy { }

export interface IVacination { }

export interface IDepartment {
    name: string;
    code: string;
}
