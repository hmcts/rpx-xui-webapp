import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { caseTypeRefData, initialState } from '../hearing.test.data';
import { State } from '../store/reducers';
import { TypeAnswerConverter } from './type.answer.converter';

describe('TypeAnswerConverter', () => {
  let typeAnswerConverter: TypeAnswerConverter;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                caseType: caseTypeRefData
              }
            }
          }
        }
      ]
    });
    router = TestBed.inject(ActivatedRoute);
    typeAnswerConverter = new TypeAnswerConverter(router);
  });

  it('should transform type', () => {
    const STATE: State = initialState.hearings;
    const result$ = typeAnswerConverter.transformAnswer(of(STATE));
    const type = 'PERSONAL INDEPENDENT PAYMENT (NEW CLAIM) \n<ul><li>- CONDITIONS OF ENTITLEMENT - COMPLEX</li><li>- GOOD CAUSE</li><li>- RATE OF ASSESSMENT/PAYABILITY ISSUES - COMPLEX</li></ul>';
    const expected = cold('(b|)', { b: type });
    expect(result$).toBeObservable(expected);
  });
});
