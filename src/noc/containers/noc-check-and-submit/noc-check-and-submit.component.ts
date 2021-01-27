import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AFFIRMATION_DEFAULT_DISAGREE_ERROR, AFFIRMATION_NOTIFY_EVERY_PARTY_ERROR } from '../../constants/nocErrorMap.enum';
import { NocAnswer, NocEvent, NocNavigation, NocNavigationEvent, NocQuestion } from '../../models';
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

  public notifyEveryPartySub: Subscription;
  public notifyEveryParty: boolean = false;

  public validationErrors$: Observable<any>;
  public hasDisagreeError$: Observable<boolean>;
  public hasNotifyEveryPartyError$: Observable<boolean>;

  public caseReferenceSub: Subscription;
  public caseRefernce: string;

  public nocAnswersSub: Subscription;
  public nocAnswers: NocAnswer[];

  constructor(private store: Store<fromFeature.State>) {
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
                return questions.find(ques => ques.question_id === answer.question_id).question_text;
              }
            )),
            question_type: this.questions$.pipe(map(
              questions => {
                return questions.find(ques => ques.question_id === answer.question_id).answer_field_type.type;
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
    this.notifyEveryPartySub = this.store.pipe(select(fromFeature.notifyEveryParty)).subscribe(
      notifyEveryParty => this.notifyEveryParty = notifyEveryParty);
    this.validationErrors$ = this.store.pipe(select(fromFeature.validationErrors));
    this.hasDisagreeError$ = this.validationErrors$.pipe(map(errors => {
      return errors ? errors.hasOwnProperty(AFFIRMATION_DEFAULT_DISAGREE_ERROR.code) : false;
    }));
    this.hasNotifyEveryPartyError$ = this.validationErrors$.pipe(map(errors => {
      return errors ? errors.hasOwnProperty(AFFIRMATION_NOTIFY_EVERY_PARTY_ERROR.code) : false;
    }));
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
    if (this.affirmationAgreed && this.notifyEveryParty) {
      const nocEvent: NocEvent = {
        case_id: this.caseRefernce,
        answers: this.nocAnswers
      };
      this.store.dispatch(new fromFeature.SubmitNoc(nocEvent));
    } else if (this.affirmationAgreed && !this.notifyEveryParty) {
      const affirmationError = { AFFIRMATION_NOTIFY_EVERY_PARTY_ERROR };
      this.store.dispatch(new fromFeature.SetAffirmationError(affirmationError));
    } else if (!this.affirmationAgreed && this.notifyEveryParty) {
      const affirmationError = { AFFIRMATION_DEFAULT_DISAGREE_ERROR };
      this.store.dispatch(new fromFeature.SetAffirmationError(affirmationError));
    } else {
      const affirmationError = {
        AFFIRMATION_DEFAULT_DISAGREE_ERROR,
        AFFIRMATION_NOTIFY_EVERY_PARTY_ERROR
      };
      this.store.dispatch(new fromFeature.SetAffirmationError(affirmationError));
    }
  }

  public ngOnDestroy(): void {
    this.affirmationAgreedSub.unsubscribe();
    this.notifyEveryPartySub.unsubscribe();
    this.caseReferenceSub.unsubscribe();
    this.nocAnswersSub.unsubscribe();
  }
}
