import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold, hot} from 'jasmine-marbles';
import {of} from 'rxjs';
import * as fromHearingStore from '../../../hearings/store';
import {ServiceLinkedCasesModel} from '../../models/linkHearings.model';
import {HearingsService} from '../../services/hearings.service';
import * as hearingLinksActions from '../actions/hearing-links.action';
import {HearingLinksEffects} from './hearing-links.effects';

describe('Hearing Links Effects', () => {
  let actions$;
  let store: Store<fromHearingStore.State>;

  let effects: HearingLinksEffects;
  const hearingsServiceMock = jasmine.createSpyObj('HearingsService', [
    'loadServiceLinkedCases',
  ]);

  const initialState = {
    hearings: {
      hearingLinks: {
        serviceLinkedCases: [],
        linkedHearingGroup: null,
        lastError: null
      }
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
        {
          provide: HearingsService,
          useValue: hearingsServiceMock,
        },
        HearingLinksEffects,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.get(HearingLinksEffects);
    store = TestBed.get(Store) as Store<fromHearingStore.State>;
  });

  describe('loadServiceLinkedCases$', () => {
    it('should return a response with hearings list', () => {
      const SERVICE_LINKED_CASES: ServiceLinkedCasesModel[] = [{
        caseReference: '1111222233334444',
        caseName: 'Jane Smith',
        reasonsForLink: ['reason1', 'reason2']
      }, {
        caseReference: '1111222233334445',
        caseName: 'Pete Smith',
        reasonsForLink: ['reason3', 'reason4']
      }];
      hearingsServiceMock.loadServiceLinkedCases.and.returnValue(of(SERVICE_LINKED_CASES));
      const action = new hearingLinksActions.LoadServiceLinkedCases({caseReference: '1111222233334446', hearingId: 'h100000'});
      const completion = new hearingLinksActions.LoadServiceLinkedCasesSuccess(SERVICE_LINKED_CASES);
      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.loadServiceLinkedCases$).toBeObservable(expected);
    });
  });

});
