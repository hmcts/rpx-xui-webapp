import { SERVICES } from './services.spec';

const LOCATION_A = {
  id: 'a',
  locationName: 'Location A',
  services: [ SERVICES.A ]
};
const LOCATION_B = {
  id: 'b',
  locationName: 'Location B',
  services: [ SERVICES.A, SERVICES.B ]
};
const LOCATION_C = {
  id: 'c',
  locationName: 'Dodgy Location',
  services: [ SERVICES.C ]
}

export const LOCATIONS = {
  ALL: { locationName: 'All' },
  A: LOCATION_A,
  B: LOCATION_B,
  C: LOCATION_C
};
