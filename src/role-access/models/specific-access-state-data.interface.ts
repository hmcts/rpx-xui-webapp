import { HttpError } from './http-error.interface';
import { SpecificAccessState } from './specific-access-state.enum';

export interface SpecificAccessStateData {
  state: SpecificAccessState;
  lastError?: HttpError;
}
