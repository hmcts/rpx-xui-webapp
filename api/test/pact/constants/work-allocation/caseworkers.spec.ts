import { LOCATIONS } from './locations.spec';

const JOHN_SMITH = {
  firstName: 'John',
  lastName: 'Smith',
  idamId: '1',
  location: LOCATIONS.A
};
const JANE_DOE = {
  firstName: 'Jane',
  lastName: 'Doe',
  idamId: '2',
  location: LOCATIONS.A
};
const JOSEPH_BLOGGS = {
  firstName: 'Joseph',
  lastName: 'Bloggs',
  idamId: '3',
  location: LOCATIONS.B
};
const NOAH_BODY = {
  firstName: 'Noah',
  lastName: 'Body',
  idamId: '4',
  location: LOCATIONS.B
};

export const CASEWORKERS = {
  JOHN_SMITH,
  JANE_DOE,
  JOSEPH_BLOGGS,
  NOAH_BODY
};

export const CASEWORKERS_BY_LOCATION = {
  ALL: [ JANE_DOE, JOHN_SMITH, JOSEPH_BLOGGS, NOAH_BODY ],
  A: [ JANE_DOE, JOHN_SMITH ],
  B: [ JOSEPH_BLOGGS, NOAH_BODY ]
}

export const CASEWORKERS_BY_SERVICE = {
  A: [ JANE_DOE, JOHN_SMITH, JOSEPH_BLOGGS, NOAH_BODY ],
  B: [ JOSEPH_BLOGGS, NOAH_BODY ]
}

export const CASEWORKERS_BY_LOCATION_AND_SERVICE = {
  A_A: [ JANE_DOE, JOHN_SMITH ],
  A_B: [],
  B_A: [ JOSEPH_BLOGGS, NOAH_BODY ],
  B_B: [ JOSEPH_BLOGGS, NOAH_BODY ]
}
