import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NocAnswer, NocEvent, NocHttpError, NocNavigation, NocNavigationEvent, NocQuestion } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-check-and-submit',
  templateUrl: './noc-check-and-submit.component.html',
  styleUrls: ['./noc-check-and-submit.component.scss']
})
export class NocCheckAndSubmitComponent implements OnInit, OnDestroy {
  @Input()
  public navEvent: NocNavigation;

  public answers$: Observable<NocAnswer[]>;

  public questions$: Observable<NocQuestion[]>;

  @Input()
  public qAndA$: Observable<NocAnswer[]>;

  public submitForm: FormGroup;

  public affirmationAgreedSub: Subscription;
  public affirmationAgreed: boolean = false;

  public validationErrors$: Observable<NocHttpError>;

  public caseReferenceSub: Subscription;
  public caseRefernce: string;

  public nocAnswersSub: Subscription;
  public nocAnswers: NocAnswer[];

  constructor(private readonly store: Store<fromFeature.State>) {
    this.navEvent = {
      event: null,
      timestamp: null
    };
  }

  public ngOnInit() {
    this.questions$ = this.store.pipe(select(fromFeature.questions));
    this.answers$ = this.store.pipe(select(fromFeature.answers));
    this.qAndA$ = this.answers$.pipe(
      map(answers => {
        const answersWithQuestionText: NocAnswer[] = [];
        answers.forEach(answer => {
          const nocAnswerWithQuestionText: NocAnswer = {
            question_id: answer.question_id,
            question_text: this.questions$.pipe(map(
              questions => {
                return questions.find(ques => ques.questionId === answer.question_id).questionText;
              }
            )),
            value: answer.value
          };
          answersWithQuestionText.push(nocAnswerWithQuestionText);
        });
        return answersWithQuestionText;
      }));
    this.affirmationAgreedSub = this.store.pipe(select(fromFeature.affirmationAgreed)).subscribe(
      affirmationAgree => this.affirmationAgreed = affirmationAgree);
    this.validationErrors$ = this.store.pipe(select(fromFeature.validationErrors));
    this.caseReferenceSub = this.store.pipe(select(fromFeature.caseReference)).subscribe(
      caseReference => this.caseRefernce = caseReference);
    this.nocAnswersSub = this.store.pipe(select(fromFeature.answers)).subscribe(
      nocAnswers => this.nocAnswers = nocAnswers);
  }

  public navigationHandler(navEvent: NocNavigationEvent) {
    switch (navEvent) {
      case NocNavigationEvent.CHECK_ANSWERS: {
        this.verifyAndSubmitNoC();
        break;
      }
      default:
        throw new Error('Invalid option');
    }
  }

  public verifyAndSubmitNoC(): void {
    if (this.affirmationAgreed) {
      const nocEvent: NocEvent = {
        caseReference: this.caseRefernce,
        nocAnswers: this.nocAnswers
      };
      this.store.dispatch(new fromFeature.SubmitNoc(nocEvent));
    } else {
      this.store.dispatch(new fromFeature.SetAffirmationDisagreeError());
    }
  }

  public ngOnDestroy(): void {
    this.affirmationAgreedSub.unsubscribe();
    this.caseReferenceSub.unsubscribe();
    this.nocAnswersSub.unsubscribe();
  }
}
