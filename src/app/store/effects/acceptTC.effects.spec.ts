import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { of } from 'rxjs';
import { AcceptTermsService } from '../../services/acceptTerms/acceptTerms.service';
import * as acceptTandCActions from '../actions';
import * as fromTcEffects from './acceptTC.effects';
import { LoggerService } from '../../services/logger/logger.service';
import { beforeEach } from 'mocha';

describe('acceptTC Effects', () => {
  let actions$;
  let effects: fromTcEffects.AcceptTcEffects;
  const AcceptTermsServiceMock = jasmine.createSpyObj('AcceptTermsService', [
    'getIsUserAccepted', 'postUserAccepted'
  ]);
  const loggerServiceMock = jasmine.createSpyObj('loggerService', ['error']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: AcceptTermsService,
          useValue: AcceptTermsServiceMock
        },
        {
          provide: LoggerService,
          useValue: loggerServiceMock
        },
        fromTcEffects.AcceptTcEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(fromTcEffects.AcceptTcEffects);
  });

  it('should load accepted TC', () => {
    const payload = [{ payload: 'userId' }];
    AcceptTermsServiceMock.getIsUserAccepted.and.returnValue(of(payload));
    const action = new acceptTandCActions.LoadHasAcceptedTCSuccess(true);
    actions$ = hot('-a', { a: action });
    effects.loadHasAccepted$.subscribe(() => {
      expect(AcceptTermsServiceMock.getIsUserAccepted).toHaveBeenCalled();
    });
  });

  it('should accept TC', () => {
    const payload = [{ payload: 'userId' }];
    AcceptTermsServiceMock.postUserAccepted.and.returnValue(of(payload));
    const action = new acceptTandCActions.AcceptTandCSuccess(true);
    actions$ = hot('-a', { a: action });
    effects.loadHasAccepted$.subscribe(() => {
      expect(AcceptTermsServiceMock.postUserAccepted).toHaveBeenCalled();
    });
  });
});
