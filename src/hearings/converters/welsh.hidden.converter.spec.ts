import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { LocationByEpimmsModel } from '../models/location.model';
import { State } from '../store/reducers';
import { WelshHiddenConverter } from './welsh.hidden.converter';

describe('WelshHiddenConverter', () => {
  const FOUND_LOCATIONS: LocationByEpimmsModel[] = [{
    epimms_id: '234850',
    site_name: 'Cardiff Civil and Family Justice Centre',
    court_name: 'CARDIFF CIVIL AND FAMILY JUSTICE CENTRE',
    open_for_public: 'YES',
    region_id: '7',
    region: 'Wales',
    cluster_id: null,
    cluster_name: null,
    court_status: 'Open',
    court_open_date: null,
    closed_date: null,
    postcode: 'CF10 1ET',
    court_address: 'PARK STREET, CARDIFF',
    phone_number: '',
    court_location_code: '',
    dx_address: '99500 CARDIFF 6',
    welsh_site_name: '',
    welsh_court_address: '',
    venue_name: '',
    is_case_management_location: '',
    is_hearing_location: ''
  }];

  let welshHiddenConverter: WelshHiddenConverter;
  const locationsDataService = jasmine.createSpyObj('LocationsDataService', ['getLocationById']);

  beforeEach(() => {
    welshHiddenConverter = new WelshHiddenConverter(locationsDataService);
    locationsDataService.getLocationById.and.returnValue(of(FOUND_LOCATIONS));
  });

  it('should transform hidden of welsh answer', () => {
    const STATE: State = initialState.hearings;
    const result$ = welshHiddenConverter.transformHidden(of(STATE));
    const hideWelshPage = false;
    const expected = cold('(b|)', { b: hideWelshPage });
    expect(result$).toBeObservable(expected);
  });
});
