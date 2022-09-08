import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { HttpError } from '../../../models/httpError.model';
import { Go } from '../../../app/store/actions';
import * as fromHearingStore from '../../../hearings/store';
import { GroupLinkType } from '../../models/hearings.enum';
import { ServiceLinkedCasesModel } from '../../models/linkHearings.model';
import { HearingsService } from '../../services/hearings.service';
import * as hearingLinksActions from '../actions/hearing-links.action';
import { HearingLinksEffects } from './hearing-links.effects';

describe('Hearing Links Effects', () => {
  let actions$;
  let store: Store<fromHearingStore.State>;

  let effects: HearingLinksEffects;
  const hearingsServiceMock = jasmine.createSpyObj('HearingsService', [
    'loadServiceLinkedCases', 'postLinkedHearingGroup'
  ]);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
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
          provide: Router,
          useValue: mockRouter,
        },
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

  describe('submitLinkedHearingGroup$', () => {
    it('should submit linked hearing group', () => {
      const linkedHearingGroup = {
        groupDetails: {
          groupName: 'Group A',
          groupReason: 'Reason 1',
          groupLinkType: GroupLinkType.ORDERED,
          groupComments: 'Comment 1',
        },
        hearingsInGroup: [
          {
            hearingId: 'h1000001',
            hearingOrder: 1,
          },
          {
            hearingId: 'h1000003',
            hearingOrder: 2,
          },
          {
            hearingId: 'h1000005',
            hearingOrder: 3,
          }],
      };
      const caseId = '1111222233334444';
      const hearingId = 'h100002';
      hearingsServiceMock.postLinkedHearingGroup.and.returnValue(of({hearingGroupRequestId: 'g1000000'}));
      const action = new hearingLinksActions.SubmitLinkedHearingGroup({linkedHearingGroup, caseId, hearingId});
      actions$ = cold('-a', {a: action});
      const expected = cold('-b', {b: {hearingGroupRequestId: 'g1000000'}});
      expect(effects.submitLinkedHearingGroup$).toBeObservable(expected);
      expect(hearingsServiceMock.postLinkedHearingGroup).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith([ '/', 'hearings', 'link', '1111222233334444', 'h100002', 'final-confirmation' ]);
    });

    it('should error submitting linked hearing group', () => {
      const error: HttpError = {
        status: 403,
        message: 'Http failure response: 403 Forbidden',
      };
      const dispatchSpy = spyOn(store, 'dispatch');
      const linkedHearingGroup = {
        groupDetails: {
          groupName: 'Group A',
          groupReason: 'Reason 1',
          groupLinkType: GroupLinkType.ORDERED,
          groupComments: 'Comment 1',
        },
        hearingsInGroup: [
          {
            hearingId: 'h1000001',
            hearingOrder: 1,
          },
          {
            hearingId: 'h1000003',
            hearingOrder: 2,
          },
          {
            hearingId: 'h1000005',
            hearingOrder: 3,
          }],
      };
      const caseId = '1111222233334444';
      const hearingId = 'h100002';
      hearingsServiceMock.postLinkedHearingGroup.and.returnValue(Observable.throwError(error));
      const action = new hearingLinksActions.SubmitLinkedHearingGroup({linkedHearingGroup, caseId, hearingId});
      actions$ = cold('-a', {a: action});
      const expected = cold('-b', {b: error});
      expect(effects.submitLinkedHearingGroup$).toBeObservable(expected);
      expect(hearingsServiceMock.postLinkedHearingGroup).toHaveBeenCalled();
      expect(dispatchSpy).toHaveBeenCalledWith(new hearingLinksActions.SubmitLinkedHearingGroupFailure(error));
    });
  });

  describe('handleError', () => {
    it('should handle errors', () => {
      const action$ = HearingLinksEffects.handleError({
        status: 403,
        message: 'error'
      });
      action$.subscribe(action => expect(action).toEqual(new Go({ path: ['/hearings/error'] })));
    });
  });
});
