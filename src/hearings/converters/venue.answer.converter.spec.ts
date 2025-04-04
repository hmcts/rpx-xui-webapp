import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { LocationByEpimmsModel } from '../models/location.model';
import { State } from '../store/reducers';
import { VenueAnswerConverter } from './venue.answer.converter';

describe('VenueAnswerConverter', () => {
  const FOUND_LOCATIONS: LocationByEpimmsModel[] = [{
    epimms_id: '196538',
    site_name: 'Liverpool Social Security and Child Support Tribunal',
    court_name: 'LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL',
    open_for_public: 'YES',
    region_id: '5',
    region: 'North West',
    cluster_id: '3',
    cluster_name: 'Cheshire and Merseyside',
    court_status: 'Open',
    court_open_date: null,
    closed_date: null,
    postcode: 'L2 5UZ',
    court_address: 'PRUDENTIAL BUILDING, 36 DALE STREET, LIVERPOOL',
    phone_number: '',
    court_location_code: '',
    dx_address: '',
    welsh_site_name: '',
    welsh_court_address: '',
    venue_name: 'Liverpool',
    is_case_management_location: 'Y',
    is_hearing_location: 'Y'
  }];
  let venueAnswerConverter: VenueAnswerConverter;
  const locationsDataService = jasmine.createSpyObj('LocationsDataService', ['getLocationById']);

  beforeEach(() => {
    venueAnswerConverter = new VenueAnswerConverter(locationsDataService);
    locationsDataService.getLocationById.and.returnValue(of(FOUND_LOCATIONS));
  });

  it('should transform type', () => {
    const STATE: State = initialState.hearings;
    const result$ = venueAnswerConverter.transformAnswer(of(STATE));
    const type = '<ul><li>LIVERPOOL SOCIAL SECURITY AND CHILD SUPPORT TRIBUNAL</li></ul>';
    const expected = cold('(b|)', { b: type });
    expect(result$).toBeObservable(expected);
  });
});
