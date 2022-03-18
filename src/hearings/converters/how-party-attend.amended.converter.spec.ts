import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {of} from 'rxjs';
import {hearingStageRefData, initialState} from '../hearing.test.data';
import {HowPartyAttendAmendedConverter} from './how-party-attend.amended.converter';

describe('HowPartyAttendAmendedConverter', () => {

  let converter: HowPartyAttendAmendedConverter;
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
    converter = new HowPartyAttendAmendedConverter();
  });

  it('should transform the amended flag when previous vs current party attending type are not equal', () => {
    const result$ = converter.transformIsAmended(of(initialState.hearings));
    const isAmended = true;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });
});

