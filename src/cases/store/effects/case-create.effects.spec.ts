import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

import * as fromEffects from './case-create.effects';
import * as fromActions from '../actions/create-case.action';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('CaseCreate Effects', () => {
  let actions$: TestActions;
  let effects: fromEffects.CaseCreateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        fromEffects.CaseCreateEffects,
        { provide: Actions, useFactory: getActions },
      ],
    });

    actions$ = TestBed.get(Actions);
    effects = TestBed.get(fromEffects.CaseCreateEffects);

  });

  describe('loadToppings$', () => {
    it('should return a collection from LoadToppingsSuccess', () => {
      const action = new fromActions.ApplyChange({});

      actions$.stream = hot('-a', { a: action });

      expect(effects.applyChangeCaseCreate$).toBeTruthy();
    });
  });
});
