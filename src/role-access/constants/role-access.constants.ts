import { RoleAllocationType } from '../models/enums';

export const ROLE_ALLOCATION_CONSTANTS = {
  Exclusion: { allocation: RoleAllocationType.Exclusion },
  Judiciary: { allocation: RoleAllocationType.Judiciary },
  LegalOps: { allocation: RoleAllocationType.LegalOps }
};

export const EXCLUSION_OPTION = 'exclusionOption';
export const PERSON_ROLE = 'personRole';
