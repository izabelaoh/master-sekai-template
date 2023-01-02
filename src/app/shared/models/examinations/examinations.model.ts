export interface IExamination {
    Id?: string;
    PatientId?: string;
    ExaminationDate: any;
    Department: string;
    IsCovidExamination: boolean;
    Diagnoses: IDiagnose[];
    Therapies: ITherapy[];
    Vaccinations: IVacination[];
    Measurements: IMeasurements;
    Doctor: string;
    IsSubmitted: boolean;
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

export interface IMeasurements {
    bodyMeasurements: {
        weight: string;
        height: string;
        temperature: string;
    },
    bloodTest: {
        wbcs: string;
        neitrophils: string;
        lymphocytes: string;
        monocytes: string;
        eosinophils: string;
        basophiles: string;
        rbcs: string;
        hb: string;
        hematocrit: string;
        platelets: string;
    }
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

export interface IVaccineModel {
    code: string;
    name: string;
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

export interface IVacination {
    code: string;
    name: string;
    date?: any;
    performedBy?: string;
}

export interface IDepartment {
    name: string;
    code: string;
}
