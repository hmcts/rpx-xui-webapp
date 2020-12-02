import { ACTIONS } from './actions.spec';

const KILI_MUSO = {
  id: '1604075580956811',
  caseReference: '1604 0755 8095 6811',
  caseName: 'Kili Muso',
  caseCategory: 'Grant of representation',
  location: 'Taylor House',
  taskName: 'Apply for probate',
  dueDate: new Date(1604938789000),
  actions: [ ACTIONS.REASSIGN, ACTIONS.RELEASE ]
};

const MANKAI_LIT = {
  id: '2345678901234567',
  caseReference: '2345 6789 0123 4567',
  caseName: 'Mankai Lit',
  caseCategory: 'Revocation',
  location: 'Taylor House',
  taskName: 'Review appellant case',
  dueDate: new Date(1604506789000),
  actions: [ ACTIONS.RELEASE ]
};

const BOB_CRATCHITT = {
  id: '3456789012345678',
  caseReference: '3456 7890 1234 5678',
  caseName: 'Bob Cratchit',
  caseCategory: 'Protection',
  location: 'Taylor Swift',
  taskName: 'Review respondent evidence',
  dueDate: new Date(),
  actions: [ ACTIONS.REASSIGN, ACTIONS.RELEASE ]
};

const EBENEZER_SCROOGE = {
  id: '4567890123456789',
  caseReference: '4567 8901 2345 6789',
  caseName: 'Ebenezer Scrooge',
  caseCategory: 'Revocation',
  location: 'Bleak House',
  taskName: 'Review appellant case',
  dueDate: new Date(),
  actions: [ ACTIONS.RELEASE ]
};

const OLIVER_TWIST = {
  id: '5678901234567890',
  caseReference: '5678 9012 3456 7890',
  caseName: 'Oliver Twist',
  caseCategory: 'Protection',
  location: 'Orphanage',
  taskName: 'Give more gruel',
  dueDate: new Date(new Date().getTime() + (86400 * 5000)),
  actions: [ ACTIONS.REASSIGN, ACTIONS.RELEASE ]
};

const DAVID_COPPERFIELD = {
  id: '6789012345678901',
  caseReference: '6789 0123 4567 8901',
  caseName: 'David Copperfield',
  caseCategory: 'Revocation',
  location: 'Taylor House',
  taskName: 'Review appellant case',
  dueDate: new Date(1604506789000),
  actions: [ ACTIONS.RELEASE ]
};

const SORTED_BY_CASE_REFERENCE = [
  KILI_MUSO, MANKAI_LIT, BOB_CRATCHITT, EBENEZER_SCROOGE, OLIVER_TWIST, DAVID_COPPERFIELD
];

const SORTED_BY_CASE_NAME = [
  BOB_CRATCHITT, DAVID_COPPERFIELD, EBENEZER_SCROOGE, KILI_MUSO, MANKAI_LIT, OLIVER_TWIST
];

const SORTED_BY_CATEGORY = [
  KILI_MUSO, BOB_CRATCHITT, OLIVER_TWIST, DAVID_COPPERFIELD, EBENEZER_SCROOGE, MANKAI_LIT
];

const SORTED_BY_LOCATION = [
  EBENEZER_SCROOGE, OLIVER_TWIST, KILI_MUSO, DAVID_COPPERFIELD, MANKAI_LIT, BOB_CRATCHITT
];

const SORTED_BY_TASK = [
  KILI_MUSO, OLIVER_TWIST, EBENEZER_SCROOGE, DAVID_COPPERFIELD, MANKAI_LIT, BOB_CRATCHITT
];

const SORTED_BY_DUE_DATE = [
  MANKAI_LIT, DAVID_COPPERFIELD, KILI_MUSO, BOB_CRATCHITT, EBENEZER_SCROOGE, OLIVER_TWIST
];

export const TASKS = {
  BOB_CRATCHITT,
  DAVID_COPPERFIELD,
  EBENEZER_SCROOGE,
  KILI_MUSO,
  MANKAI_LIT,
  OLIVER_TWIST
};

export const TASKS_SORTED_BY = {
  caseReference: [ ...SORTED_BY_CASE_REFERENCE ],
  caseName: [ ...SORTED_BY_CASE_NAME ],
  caseCategory: [ ...SORTED_BY_CATEGORY ],
  location: [ ...SORTED_BY_LOCATION ],
  taskName: [ ...SORTED_BY_TASK ],
  dueDate: [ ...SORTED_BY_DUE_DATE ]
};
