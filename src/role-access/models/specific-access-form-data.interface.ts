import { AnyFn } from "@ngrx/store/src/selector";

export interface SpecificAccessFormData {
  specificAccessDurationForm?: SpecificAccessDurationForm;
}

export interface SpecificAccessDurationForm {
  selectedOption: any;
  selectedDuration: any;
}
