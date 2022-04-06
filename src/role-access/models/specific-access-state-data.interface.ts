import { AccessReason } from './enums';
import { HttpError } from './http-error.interface';
import { SpecificAccessState } from './specific-access-state.enum';

export interface SpecificAccessStateData {
  state: SpecificAccessState;
  accessReason: AccessReason;
  lastError?: HttpError;
}
