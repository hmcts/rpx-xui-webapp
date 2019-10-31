import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import * as fromEffects from './case-create.effects';

export class TestActions extends Actions {
  constructor() {
    // tslint:disable-next-line: deprecation
    super(empty());
  }

  public set stream(source: Observable<any>) {
    // tslint:disable-next-line: deprecation
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}
let mockAlertService: any;
let mockLogger: any;
describe('CaseCreate Effects', () => {
  let actions$: TestActions;
  let effects: fromEffects.CaseCreateEffects;
  mockAlertService = jasmine.createSpyObj('alertService', ['success']);
  mockLogger = jasmine.createSpyObj('mockLogger', ['info']);
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        fromEffects.CaseCreateEffects,
        { provide: AlertService, useClass: mockAlertService },
        { provide: Actions, useFactory: getActions },
      ],
    });
    actions$ = TestBed.get(Actions);
    router = TestBed.get(Router);
    router.initialNavigation();
    effects = new fromEffects.CaseCreateEffects(actions$, mockAlertService, mockLogger);

  });

  describe('loadToppings$', () => {
    it('should return a collection from LoadToppingsSuccess', () => {
      expect(effects).toBeTruthy();
    });
  });
});
