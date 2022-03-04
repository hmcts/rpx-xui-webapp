import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {hearingStageRefData, initialState} from '../hearing.test.data';
import {State} from '../store';
import { HowManyPeopleAttendAmendedConverter } from './how-many-people-attend.amended.converter';

describe('HowManyPeopleAttendAmendedConverter', () => {

  let converter: HowManyPeopleAttendAmendedConverter;
  let store: Store<any>;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingStageOptions: hearingStageRefData,
              },
            },
          },
        }
      ]
    });
    store = TestBed.get(Store);
    router = TestBed.get(ActivatedRoute);
    converter = new HowManyPeopleAttendAmendedConverter();
  });

  it('should transform the amended flag when previous vs current people attend count are not equal', () => {
    const STATE: State = initialState.hearings;
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.numberOfPhysicalAttendees = 2;
    const result$ = converter.transformIsAmended(of(STATE));
    const isAmended = true;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });
});
