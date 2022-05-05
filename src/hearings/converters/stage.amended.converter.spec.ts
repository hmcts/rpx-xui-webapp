import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import * as _ from 'lodash';
import {of} from 'rxjs';
import {hearingStageRefData, initialState} from '../hearing.test.data';
import {State} from '../store';
import {StageAmendedConverter} from './stage.amended.converter';

describe('StageAnswerConverter', () => {

  let converter: StageAmendedConverter;
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
    converter = new StageAmendedConverter();
  });

  it('should not transform the amended flag when previous vs current hearing type are equal', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.hearingType = 'final';
    const result$ = converter.transformIsAmended(of(STATE));
    const isAmended = false;
    const expected = cold('(b|)', {b: isAmended});
    expect(result$).toBeObservable(expected);
  });
});

