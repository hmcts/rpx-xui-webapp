import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { NocNavigationEvent } from '../../../noc/models';
import * as fromNocStore from '../../store';
import { NocErrorPipe } from '../noc-field/utils';
import { NocQAndAComponent } from './noc-q-and-a.component';

@Pipe({ name: 'rpxTranslate' })
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('NocQAndAComponent', () => {
  const FORM_GROUP = new FormGroup({});
  let store;
  let component: NocQAndAComponent;
  let fixture: ComponentFixture<NocQAndAComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [NocQAndAComponent, RpxTranslateMockPipe],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        provideMockStore(),
        NocErrorPipe
      ]
    })
      .compileComponents();
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NocQAndAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.formGroup = FORM_GROUP;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('navigationHandler', () => {
    const FORM_GROUP_WITH_ANSWERS = new FormGroup({
      question1: new FormControl('An answer'),
      question2: new FormControl('Another answer')
    });
    const caseReference = '1111222233334444';

    beforeEach(() => {
      component.formGroup = FORM_GROUP_WITH_ANSWERS;
      component.nocCaseReference = caseReference;
    });

    it('should handle the SET_ANSWERS NoC navigation event and set the question answers on the store', () => {
      component.navigationHandler(NocNavigationEvent.SET_ANSWERS);
      expect(store.dispatch).toHaveBeenCalledWith(new fromNocStore.SetAnswers({
        case_id: '1111222233334444',
        answers: [
          {
            question_id: 'question1',
            value: 'An answer'
          },
          {
            question_id: 'question2',
            value: 'Another answer'
          }
        ]
      }));
    });

    it('should setPossibleIncorrectAnswerError', () => {
      component.lastError$ = of({
        status: 400,
        message: 'Bad request',
        error: {
          code: 'answers-not-matched-any-litigant',
          message: 'The answers did not match those for any litigant'
        }
      });
      component.setPossibleIncorrectAnswerError();
      Object.keys(component.formGroup.controls).forEach((key) => {
        expect(component.formGroup.controls[key].getError('possibleIncorrectAnswer')).toBeTruthy();
      });
    });

    it('should setAllAnswerEmptyError', () => {
      component.setAllAnswerEmptyError();
      Object.keys(component.formGroup.controls).forEach((key) => {
        expect(component.formGroup.controls[key].getError('allAnswerEmpty')).toBeTruthy();
      });
    });

    it('should purgeAllAnswerEmptyError', () => {
      component.purgeAllAnswerEmptyError();
      Object.keys(component.formGroup.controls).forEach((key) => {
        expect(component.formGroup.controls[key].getError('allAnswerEmpty')).toBeFalsy();
      });
    });

    it('should get answerInStore', () => {
      component.answers$ = of([{
        question_id: 'Q111111',
        value: 'A111111'
      }]);
      const answer1$ = component.answerInStore('Q111111');
      answer1$.toPromise().then((result) => {
        expect(result).toBe('A111111');
      });
      const answer2$ = component.answerInStore('Q222222');
      answer2$.toPromise().then((result) => {
        expect(result).toBeFalsy();
      });
    });
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
