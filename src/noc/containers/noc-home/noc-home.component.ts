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
        this.store.dispatch(new fromFeature.Reset());
        break;
      }
      case NocNavigationEvent.SUBMIT: {
        // this.store.dispatch(new fromFeature.SetAnswers(this.caseRefForm.controls));
        break;
      }
    }
  }

  public ngOnDestroy() {
    if (this.nocNavigationCurrentStateSub) {
      this.nocNavigationCurrentStateSub.unsubscribe();
    }
  }
}
