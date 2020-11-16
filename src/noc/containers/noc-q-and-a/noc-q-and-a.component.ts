import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NocAnswer, NocEvent, NocNavigation, NocNavigationEvent, NocQuestion, NocState } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-q-and-a',
  templateUrl: './noc-q-and-a.component.html',
  styleUrls: ['./noc-q-and-a.component.scss']
})
export class NocQAndAComponent implements OnInit, OnChanges, OnDestroy {

  public questions$: Observable<NocQuestion[]>;
  public answers$: Observable<NocAnswer[]>;
  public formGroup: FormGroup;
  @Input() public navEvent: NocNavigation;

  public nocNavigationCurrentState: NocState;
  private nocNavigationCurrentStateSub: Subscription;
  public nocCaseReference: string;
  private nocCaseReferenceSub: Subscription;

  constructor(private readonly store: Store<fromFeature.State>) { }

  public ngOnInit() {
    this.questions$ = this.store.pipe(select(fromFeature.questions));
    this.answers$ = this.store.pipe(select(fromFeature.answers));
    this.formGroup = new FormGroup({});
    this.nocNavigationCurrentStateSub = this.store.pipe(select(fromFeature.currentNavigation)).subscribe(
      state => this.nocNavigationCurrentState = state);
    this.nocCaseReferenceSub = this.store.pipe(select(fromFeature.caseReference)).subscribe(
      caseReference => this.nocCaseReference = caseReference);
  }

  public answerInStore(questionId: string): Observable<string> {
    return this.answers$.pipe(map(answers => {
      if (answers) {
        return answers.find(answer => answer.question_id === questionId).value || '';
      } else {
        return '';
      }
    }));
  }

  public ngOnChanges(changes: SimpleChanges) {
    // Check the current navigation state is the correct one (i.e. NocState.QUESTION) before proceeding
    // (necessary because some navigation events are triggered from multiple states)
    if (this.nocNavigationCurrentState === NocState.QUESTION && changes.navEvent && this.navEvent) {
      this.navigationHandler(this.navEvent.event);
    }
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
      this.store.dispatch(new fromFeature.SetAnswers(nocEvent));
    }
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
