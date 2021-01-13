import { CaseType, Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';

const CASE_TYPE_1: CaseType = {
  id: 'CT0',
  name: 'Case type 0',
  description: '',
  states: [],
  events: [],
  case_fields: [],
  jurisdiction: null
};

const CASE_TYPE_2: CaseType = {
  id: 'CT2',
  name: 'Case type 2',
  description: '',
  states: [],
  events: [],
  case_fields: [],
  jurisdiction: null
};

const CASE_TYPE_3: CaseType = {
  name: 'Benefit',
  id: 'Benefit',
  description: '',
  states: [],
  events: [],
  case_fields: [],
  jurisdiction: null
};

const JURISDICTION_1: Jurisdiction = {
  id: 'J1',
  name: 'Jurisdiction 1',
  description: '',
  caseTypes: [CASE_TYPE_1, CASE_TYPE_2]
};

const SSCS: Jurisdiction = {
  id: 'J2',
  name: 'SSCS',
  description: '',
  caseTypes: [CASE_TYPE_3]
};


export const mocked = {
  juristdiction1: JURISDICTION_1,
  juristdiction2: SSCS
};
