import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NocAnswer, NocEvent, NocHttpError, NocNavigation, NocNavigationEvent, NocQuestion, NocState } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-q-and-a',
  templateUrl: './noc-q-and-a.component.html',
  styleUrls: ['./noc-q-and-a.component.scss']
})
export class NocQAndAComponent implements OnInit, OnDestroy {

  public questions$: Observable<NocQuestion[]>;
  public answers$: Observable<NocAnswer[]>;
  public formGroup: FormGroup;
  @Input() public navEvent: NocNavigation;

  public nocNavigationCurrentState: NocState;
  private nocNavigationCurrentStateSub: Subscription;
  public nocCaseReference: string;
  private nocCaseReferenceSub: Subscription;
  public lastError$: Observable<NocHttpError>;
  public lastError: NocHttpError;
  public allAnswerEmpty: boolean = false;

  constructor(private readonly store: Store<fromFeature.State>) { }

  public ngOnInit() {
    this.lastError$ = this.store.pipe(select(fromFeature.lastError));
    this.setPossibleIncorrectAnswerError();

    this.questions$ = this.store.pipe(select(fromFeature.questions));
    this.answers$ = this.store.pipe(select(fromFeature.answers));
    this.formGroup = new FormGroup({});
    this.nocNavigationCurrentStateSub = this.store.pipe(select(fromFeature.currentNavigation)).subscribe(
      state => this.nocNavigationCurrentState = state);
    this.nocCaseReferenceSub = this.store.pipe(select(fromFeature.caseReference)).subscribe(
      caseReference => this.nocCaseReference = caseReference);
  }

  public setPossibleIncorrectAnswerError(): void {
    this.lastError$.subscribe( lastError => {
      this.lastError = lastError;
      if (this.lastError && this.lastError.error.errorCode === 'answersIncomplete') {
        Object.keys(this.formGroup.controls).forEach(key => {
          if (this.formGroup.controls[key].value) {
            this.formGroup.controls[key].setErrors({
              possibleIncorrectAnswer: true
            });
          }
        });
      }
    });
  }

  public setAllAnswerEmptyError(): void {
    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.controls[key].setErrors({
        allAnswerEmpty: true
      });
    });
  }

  public purgeAllAnswerEmptyError(): void {
    Object.keys(this.formGroup.controls).forEach(key => {
      if (this.formGroup.controls[key].errors
        && this.formGroup.controls[key].errors.hasOwnProperty('allAnswerEmpty')) {
        this.formGroup.controls[key].setErrors(null);
      }
    });
  }

  public answerInStore(questionId: string): Observable<string> {
    return this.answers$.pipe(map(answers => {
      if (answers) {
        const foundAnswer = answers.find(answer => answer.question_id === questionId);
        return foundAnswer ? foundAnswer.value : '';
      } else {
        return '';
      }
    }));
  }

  public navigationHandler(navEvent: NocNavigationEvent) {
    if (navEvent === NocNavigationEvent.SET_ANSWERS && this.formGroup) {
      const nocAnswers: NocAnswer[] = [];
      Object.keys(this.formGroup.value).forEach(key => {
        nocAnswers.push({question_id: key, value: this.formGroup.value[key]});
      });
      const nocEvent: NocEvent = {
        caseReference: this.nocCaseReference,
        nocAnswers
      };
      if (this.validForm()) {
        this.store.dispatch(new fromFeature.SetAnswers(nocEvent));
      }
    }
  }

  public validForm(): boolean {
    // if all values are empty then the form is invalid
    const allControlValues: string[] = Object.values(this.formGroup.value);
    this.allAnswerEmpty = allControlValues.every(value => value === null || value === '');
    if (this.allAnswerEmpty) {
      this.setAllAnswerEmptyError();
      return false;
    } else {
      this.purgeAllAnswerEmptyError();
    }
    // if an error is found but the error is not 'possibleIncorrectAnswer'(back end validation error) then the form is invalid
    const allControlKeys: string[] = Object.keys(this.formGroup.controls);
    for (const controlKey of allControlKeys) {
      if (this.formGroup.controls[controlKey].errors
        && !this.formGroup.controls[controlKey].errors.hasOwnProperty('possibleIncorrectAnswer')
        && this.formGroup.controls[controlKey].invalid) {
        return false;
      }
    }
    return true;
  }

  public ngOnDestroy() {
    if (this.nocNavigationCurrentStateSub) {
      this.nocNavigationCurrentStateSub.unsubscribe();
    }

    if (this.nocCaseReferenceSub) {
      this.nocCaseReferenceSub.unsubscribe();
    }
  }
}
