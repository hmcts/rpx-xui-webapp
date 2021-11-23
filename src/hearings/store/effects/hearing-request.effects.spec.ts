import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Go} from '../../../app/store/actions';
import {HearingsService} from '../../services/hearings.service';
import {HearingRequestEffects} from './hearing-request.effects';

describe('Hearing Request Effects', () => {
  const actions$ = null;
  let effects: HearingRequestEffects;
  const hearingsServiceMock = jasmine.createSpyObj('HearingsService', [
    'getAllHearings',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HearingsService,
          useValue: hearingsServiceMock,
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
