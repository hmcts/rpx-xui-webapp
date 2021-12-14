import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {provideMockActions} from '@ngrx/effects/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {Go} from '../../../app/store/actions';
import {HearingsService} from '../../services/hearings.service';
import {AbstractPageFlow} from '../../utils/abstract-page-flow';
import {HearingRequestEffects} from './hearing-request.effects';

describe('Hearing Request Effects', () => {
  const actions$ = null;
  let effects: HearingRequestEffects;
  const hearingsServiceMock = jasmine.createSpyObj('HearingsService', [
    'getAllHearings',
  ]);
  const pageflowMock = jasmine.createSpyObj('AbstractPageFlow', [
    'getCurrentPage', 'getLastPage', 'getNextPage'
  ]);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const initialState = {
    hearings: {
      hearingList: {
        caseHearingMainModel: [
          {
            hmctsServiceID: 'SSCS'
          }
        ]
      },
      hearingValues: null,
      hearingRequest: null,
      hearingConditions: null,
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
        {
          provide: AbstractPageFlow,
          useValue: pageflowMock,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        HearingRequestEffects,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.get(HearingRequestEffects);
  });

  describe('handleError', () => {
    it('should handle 500', () => {
      const action$ = HearingRequestEffects.handleError({
        status: 500,
        message: 'error'
      });
      action$.subscribe(action => expect(action).toEqual(new Go({path: ['/service-down']})));
    });
  });
});
