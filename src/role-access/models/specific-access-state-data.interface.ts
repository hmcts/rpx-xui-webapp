import { RoleCategory } from '@hmcts/ccd-case-ui-toolkit/dist/shared';
import { Person } from '@hmcts/rpx-xui-common-lib';
import { SpecificRole } from '.';
import { Period } from './allocate-role.enum';
import { AccessReason } from './enums';
import { HttpError } from './http-error.interface';
import { SpecificAccessFormData, SpecificAccessMoreInformationForm } from './specific-access-form-data.interface';
import { SpecificAccessState } from './specific-access-state.enum';

export interface SpecificAccessStateData {
  state: SpecificAccessState;
  caseId: string;
  taskId?: string;
  jurisdiction: string;
  typeOfRole?: SpecificRole;
  roleCategory: RoleCategory;
  requestedRole: string;
  accessReason: AccessReason;
  person: Person;
  requestId: string;
  period?: Period;
  lastError?: HttpError;
  comment?: string;
  specificAccessFormData?: SpecificAccessFormData;
  SpecificAccessMoreInformationFormData?: SpecificAccessMoreInformationForm;
}
