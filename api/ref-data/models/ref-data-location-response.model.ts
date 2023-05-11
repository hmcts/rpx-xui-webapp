import { RefDataLocation } from './ref-data-location.model';

export interface LocationByServiceCodeResponse {
  court_type: string;
  court_type_id: string;
  court_venues: RefDataLocation[];
  service_code: string;
  welsh_court_type: string;
}
