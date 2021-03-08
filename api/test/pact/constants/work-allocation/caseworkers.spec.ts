import { LOCATIONS } from './locations.spec';

const JOHN_SMITH = {
  firstName: 'John',
  lastName: 'Smith',
  idamId: '1',
  email: 'john.smith@caseworkers.gov.uk',
  location: LOCATIONS.A
};
const JANE_DOE = {
  firstName: 'Jane',
  lastName: 'Doe',
  idamId: '2',
  email: 'jane.doe@caseworkers.gov.uk',
  location: LOCATIONS.A
};
const JOSEPH_BLOGGS = {
  firstName: 'Joseph',
  lastName: 'Bloggs',
  idamId: '3',
  email: 'joe.bloggs@caseworkers.gov.uk',
  location: LOCATIONS.B
};
const NOAH_BODY = {
  firstName: 'Noah',
  lastName: 'Body',
  idamId: '4',
  email: 'noah.body@caseworkers.gov.uk',
  location: LOCATIONS.B
};

// To be used for errors.
const BRAD_REQUEST = {
  firstName: 'Brad',
  lastName: 'Request',
  idamId: '400',
  email: 'brad.request400@hotmail.com',
  location: LOCATIONS.C
};
const AL_REDDY_DUNNE = {
  firstName: 'Al',
  lastName: 'Reddy-Dunne',
  idamId: '204',
  email: 'al.reddydunne204@hotmail.co.uk',
  location: LOCATIONS.C
};
const NAT_ALLOWED = {
  firstName: 'Nat',
  lastName: 'Allowed',
  idamId: '403',
  email: 'nat.allowed.403@gmail.com',
  location: LOCATIONS.C
};
const ANNE_SUPPORTED = {
  firstName: 'Anne',
  lastName: 'Supported',
  idamId: '415',
  email: 'anne_supported_415@dodgy-url.net',
  location: LOCATIONS.C
};
const SIR_VAN_ERROR = {
  firstName: 'Sir',
  lastName: 'Van Error',
  idamId: '500',
  email: 'sir.van@error500.org',
  location: LOCATIONS.C
}

export const CASEWORKERS = {
  JOHN_SMITH,
  JANE_DOE,
  JOSEPH_BLOGGS,
  NOAH_BODY,
  BRAD_REQUEST,
  AL_REDDY_DUNNE,
  NAT_ALLOWED,
  ANNE_SUPPORTED,
  SIR_VAN_ERROR
};

export const ALL_CASEWORKERS = [
  AL_REDDY_DUNNE, ANNE_SUPPORTED, BRAD_REQUEST, JANE_DOE, JOHN_SMITH,
  JOSEPH_BLOGGS, NAT_ALLOWED, NOAH_BODY, SIR_VAN_ERROR
]

export const CASEWORKERS_BY_LOCATION = {
  ALL: ALL_CASEWORKERS,
  A: [ JANE_DOE, JOHN_SMITH ],
  B: [ JOSEPH_BLOGGS, NOAH_BODY ],
  C: [ AL_REDDY_DUNNE, ANNE_SUPPORTED, BRAD_REQUEST, NAT_ALLOWED, SIR_VAN_ERROR ]
}

export const CASEWORKERS_BY_SERVICE = {
  A: [ JANE_DOE, JOHN_SMITH, JOSEPH_BLOGGS, NOAH_BODY ],
  B: [ JOSEPH_BLOGGS, NOAH_BODY ],
  C: [ AL_REDDY_DUNNE, ANNE_SUPPORTED, BRAD_REQUEST, NAT_ALLOWED, SIR_VAN_ERROR ]
}

export const CASEWORKERS_BY_LOCATION_AND_SERVICE = {
  A_A: [ JANE_DOE, JOHN_SMITH ],
  A_B: [],
  A_C: [],
  B_A: [ JOSEPH_BLOGGS, NOAH_BODY ],
  B_B: [ JOSEPH_BLOGGS, NOAH_BODY ],
  B_C: [],
  C_A: [],
  C_B: [],
  C_C: [ AL_REDDY_DUNNE, ANNE_SUPPORTED, BRAD_REQUEST, NAT_ALLOWED, SIR_VAN_ERROR ]
}

export const USEFUL_CASEWORKERS = [
  JANE_DOE, JOHN_SMITH, JOSEPH_BLOGGS, NOAH_BODY
];

export const USELESS_CASEWORKERS = [
  AL_REDDY_DUNNE, ANNE_SUPPORTED, BRAD_REQUEST, NAT_ALLOWED, SIR_VAN_ERROR
];

export const toAssignee = (caseworker: { idamId: string, firstName: string, lastName: string }) => {
  return {
    id: caseworker.idamId,
    userName: `${caseworker.firstName} ${caseworker.lastName}`
  };
};
