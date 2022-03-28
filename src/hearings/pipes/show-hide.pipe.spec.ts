import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {initialState} from '../hearing.test.data';
import {IsHiddenSource} from '../models/hearings.enum';
import {LocationByEPIMMSModel} from '../models/location.model';
import {State} from '../store/reducers';
import {ShowHidePipe} from './show-hide.pipe';

describe('ShowHidePipe', () => {
  const FOUND_LOCATIONS: LocationByEPIMMSModel[] = [{
    epimms_id: '234850',
    site_name: 'Cardiff Civil and Family Justice Centre',
    court_name: 'CARDIFF CIVIL AND FAMILY JUSTICE CENTRE',
    open_for_public: 'YES',
    region_id: '8',
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
  let showHidePipe: ShowHidePipe;
  const locationsDataService = jasmine.createSpyObj('LocationsDataService', ['getLocationById']);

  beforeEach(() => {
    showHidePipe = new ShowHidePipe(locationsDataService);
    locationsDataService.getLocationById.and.returnValue(of(FOUND_LOCATIONS));
  });

  it('should transform is welsh page hidden', () => {
    const STATE: State = initialState.hearings;
    const result$ = showHidePipe.transform(IsHiddenSource.WELSH_LOCATION, of(STATE));
    const isHidden = false;
    const expected = cold('(b|)', {b: isHidden});
    expect(result$).toBeObservable(expected);
  });
});
