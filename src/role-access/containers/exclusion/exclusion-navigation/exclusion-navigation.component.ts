import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  backButtonVisibilityStates,
  cancelButtonVisibilityStates,
  confirmExclusionButtonVisibilityStates,
  continueButtonVisibilityStates
} from '../../../constants';
import { ExclusionNavigationEvent, ExclusionState, ExclusionStateData } from '../../../models';
import * as fromFeature from '../../../store';
import * as fromRoot from '../../../../app/store';

@Component({
  selector: 'exui-exclusion-navigation',
  templateUrl: 'exclusion-navigation.component.html'
})
export class ExclusionNavigationComponent implements OnInit {

  @Output() public eventTrigger = new EventEmitter();

  public navigationCurrentState$: Observable<fromFeature.State>;

  public backVisibilityStates = backButtonVisibilityStates;
  public continueVisibilityStates = continueButtonVisibilityStates;
  public confirmExclusionButtonVisibilityStates = confirmExclusionButtonVisibilityStates;
  public cancelButtonVisibilityStates = cancelButtonVisibilityStates;

  public exclusionNavigationEvent = ExclusionNavigationEvent;

  constructor(
    private store: Store<fromFeature.State>,
    private appStore: Store<fromRoot.State>
  ) {
  }

  public ngOnInit() {
    this.navigationCurrentState$ = this.store.pipe(select(fromFeature.currentNavigation));
  }

  public isVisible(currentNavigationState: ExclusionState, visibleNavigationStates: ExclusionState[]): boolean {
    return visibleNavigationStates.includes(currentNavigationState);
  }

  public onEventTrigger(event: ExclusionNavigationEvent) {
    if (event === ExclusionNavigationEvent.CANCEL) {
      this.store.pipe(select(fromFeature.getRoleAccessState)).first().subscribe(exclusion => this.loadCaseDetailsPage(exclusion));
      return;
    }
    this.eventTrigger.emit(event);
  }

  public loadCaseDetailsPage(exclusion: ExclusionStateData): void {
    this.appStore.dispatch(new fromRoot.CreateCaseGo({
      path: [`/cases/case-details/${exclusion.caseId}`],
      caseId: exclusion.caseId
    }));
  }
}
