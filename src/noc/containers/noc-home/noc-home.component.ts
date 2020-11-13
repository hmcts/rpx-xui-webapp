import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { caseRefVisibilityStates, qAndAVisibilityStates, checkAnswerVisibilityStates } from '../../constants';
import { NocNavigation, NocNavigationEvent, NocState } from '../../models';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-home',
  templateUrl: 'noc-home.component.html',
  styleUrls: ['noc-home.component.scss']
})
export class NocHomeComponent implements OnInit, OnDestroy {

  public nocNavigationCurrentState: NocState;
  private nocNavigationCurrentStateSub: Subscription;
  public navEvent: NocNavigation;

  public caseRefVisibilityStates = caseRefVisibilityStates;
  public caseRefErrorStates = [NocState.CASE_REF_SUBMISSION_FAILURE];

  public qAndAVisibilityStates = qAndAVisibilityStates;

  public checkAnswerVisibilityStates = checkAnswerVisibilityStates;

  constructor(
    private readonly store: Store<fromFeature.State>,
  ) { }

  public ngOnInit() {
    this.nocNavigationCurrentStateSub = this.store.pipe(select(fromFeature.currentNavigation)).subscribe(state => this.nocNavigationCurrentState = state);
  }

  public onNavEvent(event: NocNavigationEvent) {
    this.navEvent = {
      event,
      timestamp: Date.now()
    };
    this.navigationHandler(event);
  }

  public isComponentVisible(currentNavigationState: NocState, requiredNavigationState: NocState[]): boolean {
    return requiredNavigationState.includes(currentNavigationState);
  }

  public navigationHandler(navEvent: NocNavigationEvent) {
    switch (navEvent) {
      case NocNavigationEvent.BACK: {
        if (this.nocNavigationCurrentState === NocState.QUESTION) {
          this.store.dispatch(new fromFeature.Reset());
        } else if(this.nocNavigationCurrentState === NocState.CHECK_ANSWERS) {
          this.store.dispatch(new fromFeature.ChangeNavigation(NocState.QUESTION));
        }
        break;
      }
      // case NocNavigationEvent.SETANSWERS: {
      //   // this.store.pipe(select(fromFeature.answers)).subscribe(answers => {
      //   //   this.store.dispatch(new fromFeature.SetAnswers(answers));
      //   // });
      //   this.store.pipe(select(fromFeature.questions)).subscribe(questions => {
      //     this.store.dispatch(new fromFeature.SetQuestions(questions));
      //   });
      //   break;
      // }
    }
  }

  public ngOnDestroy() {
    if (this.nocNavigationCurrentStateSub) {
      this.nocNavigationCurrentStateSub.unsubscribe();
    }
  }
}
