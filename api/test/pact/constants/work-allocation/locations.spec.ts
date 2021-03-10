import { SERVICES } from './services.spec';

const A = {
  id: 'a',
  locationName: 'Taylor House',
  services: [ SERVICES.A ]
};
const B = {
  id: 'b',
  locationName: 'Taylor Swift',
  services: [ SERVICES.A, SERVICES.B ]
};
const C = {
  id: 'c',
  locationName: 'Dodgy Location',
  services: [ SERVICES.C ]
};
const D = {
  id: 'd',
  locationName: 'Bleak House',
  services: [ SERVICES.C ]
};
const E = {
  id: 'e',
  locationName: 'Orphanage',
  services: [ SERVICES.C ]
};

export const LOCATIONS = {
  ALL: { locationName: 'All' },
  A,
  B,
  C,
  D,
  E
};

// Sorted by name.
export const LOCATIONS_ARRAY = [ D, C, E, A, B ];

export const LOCATION_COMBINATIONS = [
  [ A ],
  [ A, B ], [ A, B, C ], [ A, B, D ], [ A, B, E ], [ A, B, C, D ], [ A, B, C, E ], [ A, B, C, D, E ],
  [ A, C ], [ A, C, D ], [ A, C, E ], [ A, C, D, E ],
  [ A, D ], [ A, D, E ],
  [ A, E ],

  [ B ],
  [ B, C ], [ B, C, D ], [ B, C, E ], [ B, C, D, E ],
  [ B, D ], [ B, D, E ],
  [ B, E ],

  [ C ],
  [ C, D ], [ C, D, E ],
  [ C, E ],

  [ D ],
  [ D, E ],

  [ E ],
  []
]
