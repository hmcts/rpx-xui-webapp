import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { CaseCreateEffects } from './case-create.effects';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { CreateCaseLoaded, ApplyChange, CaseCreateFilterApply } from '../actions/create-case.action';
import { NewCaseLoadedSuccessfully, CreateCaseGo, Go } from '../../../app/store/actions';
import { provideMockActions } from '@ngrx/effects/testing';

describe('CaseCreate Effects', () => {

  let mockAlertService: any;
  let mockLogger: any;
  let actions$;
  let effects: CaseCreateEffects;
  mockAlertService = jasmine.createSpyObj('alertService', ['success']);
  mockLogger = jasmine.createSpyObj('mockLogger', ['info']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        CaseCreateEffects,
        { provide: AlertService, useValue: mockAlertService },
        provideMockActions(() => actions$),
        { provide: LoggerService, useValue: mockLogger },
      ],
    });

    effects = TestBed.get(CaseCreateEffects);

  });

  describe('applyCreateCase$', () => {
    it('should apply case action', () => {

      const action = new ApplyChange({});
      const completion = new CreateCaseGo({
        path: ['/cases/case-details/undefined'],
        caseId: undefined
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.applyCreateCase$).toBeObservable(expected);
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
        path: ['/cases/case-create/undefined/undefined/undefined']
      });
      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.applyChangeCaseCreateFilter$).toBeObservable(expected);
    });
  });
});
