import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NocAnswer, NocNavigation, NocQuestion } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-check-and-submit',
  templateUrl: './noc-check-and-submit.component.html',
  styleUrls: ['./noc-check-and-submit.component.scss']
})
export class NocCheckAndSubmitComponent implements OnInit {
  @Input()
  public navEvent: NocNavigation;

  public answers$: Observable<NocAnswer[]>;

  public questions$: Observable<NocQuestion[]>;

  @Input()
  public qAndA$: Observable<NocAnswer[]>;

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
            value: answer.value
          };
          if (answer.value) {
            answersWithQuestionText.push(nocAnswerWithQuestionText);
          }
        });
        return answersWithQuestionText;
      }));
  }

}
