import { Jurisdiction, CaseType } from '@hmcts/ccd-case-ui-toolkit';

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
  name: 'Case type 3',
  id: 'CT3',
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

const JURISDICTION_2: Jurisdiction = {
  id: 'J2',
  name: 'Jurisdiction 2',
  description: '',
  caseTypes: [CASE_TYPE_3]
};


export const mocked = {
  juristdiction1: JURISDICTION_1,
  juristdiction2: JURISDICTION_2
};
