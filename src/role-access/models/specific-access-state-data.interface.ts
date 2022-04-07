import { HttpError } from './http-error.interface';
import { SpecificAccessFormData } from './specific-access-form-data.interface';
import { SpecificAccessState } from './specific-access-state.enum';

export interface SpecificAccessStateData {
  state: SpecificAccessState;
  lastError?: HttpError;
  specificAccessFormData?: SpecificAccessFormData;
}
