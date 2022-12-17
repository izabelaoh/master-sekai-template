import { SelectItem } from "primeng/api";
import { ISelect } from "../general/components";

export interface IBloodType extends SelectItem {
    label: string;
    value: ISelect;
}

export interface IGender extends SelectItem {
    label: string;
    value: ISelect;
}

export interface IForeignPatientType extends SelectItem {
    label: string;
    value: ISelect;
}
