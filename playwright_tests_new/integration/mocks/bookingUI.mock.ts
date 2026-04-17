import { buildExistingBookingsMock } from './bookingUI.builder';

export const singleLocationMock = [
  {
    court_venue_id: '40827',
    epimms_id: '20262',
    site_name: 'Central London County Court',
    region_id: '1',
    region: 'London',
    court_type: 'County Court',
    court_type_id: '10',
    cluster_id: null,
    cluster_name: null,
    open_for_public: 'YES',
    court_address: 'Thomas More Building, Royal Courts of Justice, Strand, London',
    postcode: 'WC2A 2LL',
    phone_number: '0207 947 7502',
    closed_date: null,
    court_location_code: '372',
    dx_address: '44453 STRAND',
    welsh_site_name: '',
    welsh_court_address: '',
    court_status: 'Open',
    court_open_date: null,
    court_name: 'Central London County Court',
    venue_name: 'Central London',
    is_case_management_location: 'Y',
    is_hearing_location: 'Y',
    welsh_venue_name: '',
    is_temporary_location: 'N',
    is_nightingale_court: 'N',
    location_type: 'COURT',
    parent_location: '',
    welsh_court_name: '',
    uprn: '',
    venue_ou_code: '',
    mrd_building_location_id: 'MRD-BLD-295',
    mrd_venue_id: 'MRD-CRT-0808',
    service_url: '',
    fact_url: 'https://www.find-court-tribunal.service.gov.uk/courts/central-london-county-court',
    external_short_name: 'Central London',
    welsh_external_short_name: 'Canol Llundain',
  },
];

export type { BookingDayRange, CreateBookingRequest, CreateBookingResponse } from '../../E2E/page-objects/pages/exui/bookingUi.po';
export { buildExistingBookingsMock };
export { getUtcDayRangeForLocalDate } from '../../E2E/page-objects/pages/exui/bookingUi.po';
