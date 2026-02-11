import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { LoggerService } from '../../../app/services/logger/logger.service';
import { SessionStorageService } from '../../../app/services';
import { EnvironmentService } from '../../../app/shared/services/environment.service';
import { CreateCaseGo, Go, NewCaseLoadedSuccessfully } from '../../../app/store/actions';
import { ApplyChange, CaseCreateFilterApply, CreateCaseLoaded, CreateCaseReset } from '../actions/create-case.action';
import { CaseCreateEffects } from './case-create.effects';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DecentralisedEventRedirectService } from '../../services/decentralised-event-redirect.service';

describe('CaseCreate Effects', () => {
  let actions$;
  let effects: CaseCreateEffects;
  const mockAlertService = jasmine.createSpyObj('alertService', ['success']);
  const mockLogger = jasmine.createSpyObj('mockLogger', ['info']);
  const mockEnvironmentService = jasmine.createSpyObj('EnvironmentService', ['get']);
  const mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem']);
  const mockWindow = { location: { assign: jasmine.createSpy('assign') } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        CaseCreateEffects,
        { provide: AlertService, useValue: mockAlertService },
        provideMockActions(() => actions$),
        { provide: LoggerService, useValue: mockLogger },
        DecentralisedEventRedirectService,
        { provide: EnvironmentService, useValue: mockEnvironmentService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: Window, useValue: mockWindow },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    mockEnvironmentService.get.and.returnValue({});
    effects = TestBed.inject(CaseCreateEffects);
  });

  describe('applyCreateCase$', () => {
    it('should apply case action', () => {
      const action = new ApplyChange({});
      const completion = new CreateCaseGo({
        path: ['/cases/case-details/undefined/undefined/undefined'],
        caseId: undefined,
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.applyCreateCase$).toBeObservable(expected);
    });
  });

  describe('cancel$', () => {
    it('should cancel case action', () => {
      const action = new CreateCaseReset();
      const completion = new Go({
        path: ['/cases'],
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.cancel$).toBeObservable(expected);
    });
  });

  describe('applyCreatedCaseLoaded$', () => {
    it('should apply load action', () => {
      const action = new CreateCaseLoaded({});
      const completion = new NewCaseLoadedSuccessfully();
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.applyCreatedCaseLoaded$).toBeObservable(expected);
    });
  });

  describe('applyChangeCaseCreateFilter$', () => {
    it('should apply load action', () => {
      const action = new CaseCreateFilterApply({});
      const completion = new Go({
        path: ['/cases/case-create/undefined/undefined/undefined'],
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.applyChangeCaseCreateFilter$).toBeObservable(expected);
    });

    it('should redirect when decentralised case-create event is configured', () => {
      mockEnvironmentService.get.and.returnValue({
        PCS: 'https://pcs-frontend.service.gov.uk',
      });
      mockSessionStorageService.getItem.and.returnValue(JSON.stringify({ id: 'user-123' }));

      const action = new CaseCreateFilterApply({
        jurisdictionId: 'IA',
        caseTypeId: 'PCS',
        eventId: 'ext:createCase',
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('---');
      expect(effects.applyChangeCaseCreateFilter$).toBeObservable(expected);
      expect(mockWindow.location.assign).toHaveBeenCalledWith(
        'https://pcs-frontend.service.gov.uk/cases/case-create/IA/PCS/ext%3AcreateCase?expected_sub=user-123'
      );
    });
  });
});
