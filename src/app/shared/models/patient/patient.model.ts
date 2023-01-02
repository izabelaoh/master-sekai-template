import { ISelect } from "../general/components";

export interface IPatientCache {
    [key: string]: IPatient
}

export interface IPatient {
    Id?: string;

    FirstName: string;
    LastName: string;
    FatherName: string;
    MotherName: string;
    PersonalNo: string;
    BloodType: ISelect;
    ForeignPatient: ISelect;
    Gender: ISelect;
    Address: string;
    Country: string;
    DateOfBirth: any;
    Email: string;
    IDnumber: string;
    Nationality: string;
    Phone: string;
    PlaceOfBirth: string;
    Passport: string;
    InsuranceUntil: any;

    IsValidInsurance?: boolean;
    ImageUrl?: string;

    IsCovidRecovered?: boolean;
    IsCovidDeceased?: boolean;
    IsCovidActive?: boolean;
}
