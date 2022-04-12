import { AccessReason } from './enums';
import { HttpError } from './http-error.interface';
import { SpecificAccessFormData, SpecificAccessMoreInformationForm } from './specific-access-form-data.interface';
import { SpecificAccessState } from './specific-access-state.enum';

export interface SpecificAccessStateData {
  state: SpecificAccessState;
  accessReason: AccessReason;
  lastError?: HttpError;
  specificAccessFormData?: SpecificAccessFormData;
  SpecificAccessMoreInformationFormData?: SpecificAccessMoreInformationForm;
}
