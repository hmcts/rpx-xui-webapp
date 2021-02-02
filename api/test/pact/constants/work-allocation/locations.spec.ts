import { SERVICE_A, SERVICE_B } from './services.spec';

const LOCATION_A = {
  id: 'a',
  locationName: 'Location A',
  services: [SERVICE_A]
};
const LOCATION_B = {
  id: 'b',
  locationName: 'Location B',
  services: [SERVICE_A, SERVICE_B]
};

export const LOCATIONS = {
  A: LOCATION_A,
  B: LOCATION_B
};
