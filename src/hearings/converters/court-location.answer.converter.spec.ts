import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LocationModel } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { CourtLocationAnswerConverter } from './court-location.answer.converter';

describe('CourtLocationAnswerConverter', () => {
  let listedVenueAnswerConverter: CourtLocationAnswerConverter;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: Store<any>;
  let router: any;
  const COURT_LOCATION: LocationModel[] = [{
    court_venue_id: '164',
    epimms_id: '815833',
    is_hearing_location: 'N',
    is_case_management_location: 'Y',
    site_name: 'Birmingham Social Security and Child Support Tribunal',
    court_name: 'BIRMINGHAM SSCS  ',
    court_status: 'Closed',
    region_id: '3',
    region: 'Midlands',
    court_type_id: '31',
    court_type: 'Social Security and Child Support Tribunal',
    cluster_id: '18',
    cluster_name: 'West Midlands and Warwickshire',
    open_for_public: 'No',
    court_address: '54 HAGLEY ROAD, EDGBASTON ',
    postcode: 'B16 8PE'
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                courtLocation: COURT_LOCATION
              }
            }
          }
        }
      ]
    });
    store = TestBed.inject(Store);
    router = TestBed.inject(ActivatedRoute);
    listedVenueAnswerConverter = new CourtLocationAnswerConverter(router);
  });

  it('should transform type', () => {
    const STATE: State = initialState.hearings;
    const result$ = listedVenueAnswerConverter.transformAnswer(of(STATE), 0);
    const type = COURT_LOCATION[0].site_name;
    const expected = cold('(b|)', { b: type });
    expect(result$).toBeObservable(expected);
  });
});
