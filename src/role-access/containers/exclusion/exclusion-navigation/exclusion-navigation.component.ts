import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  backButtonVisibilityStates,
  cancelButtonVisibilityStates,
  confirmExclusionButtonVisibilityStates,
  continueButtonVisibilityStates
} from '../../../constants';
import { ExclusionNavigationEvent, ExclusionState } from '../../../models';
import * as fromFeature from '../../../store';

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
  ) {
  }

  public ngOnInit() {
    this.navigationCurrentState$ = this.store.pipe(select(fromFeature.currentNavigation));
  }

  public isVisible(currentNavigationState: ExclusionState, visibleNavigationStates: ExclusionState[]): boolean {
    return visibleNavigationStates.includes(currentNavigationState);
  }

  public onEventTrigger(event: ExclusionNavigationEvent) {
    this.eventTrigger.emit(event);
  }

}
