import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  specificAccessBackButtonVisibilityStates,
  specificAccessCancelButtonVisibilityStates,
  specificAccessContinueButtonVisibilityStates,
  specificAccessReturnToMyTasksButtonVisibilityStates,
  specificAccessReturnToTasksTabVisibilityStates
} from '../../../constants';
import { SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
import * as fromFeature from '../../../store';

@Component({
  standalone: false,
  selector: 'exui-specific-access-navigation',
  templateUrl: 'specific-access-navigation.component.html'

})
export class SpecificAccessNavigationComponent implements OnInit {
  @Output() public eventTrigger = new EventEmitter();

  public navigationCurrentState$: Observable<SpecificAccessState>;

  public backVisibilityStates = specificAccessBackButtonVisibilityStates;
  public continueButtonVisibilityStates = specificAccessContinueButtonVisibilityStates;
  public cancelButtonVisibilityStates = specificAccessCancelButtonVisibilityStates;
  public returnToMyTasksButtonVisibilityStates = specificAccessReturnToMyTasksButtonVisibilityStates;
  public returnToTasksTabVisibilityStates = specificAccessReturnToTasksTabVisibilityStates;

  public specificAccessNavigationEvent = SpecificAccessNavigationEvent;

  constructor(
    private readonly store: Store<fromFeature.State>,
  ) {}

  public ngOnInit() {
    this.navigationCurrentState$ = this.store.pipe(select(fromFeature.currentSpecificAccessNavigation));
  }

  public isVisible(currentNavigationState: SpecificAccessState, visibleNavigationStates: SpecificAccessState[]): boolean {
    return visibleNavigationStates.includes(currentNavigationState);
  }

  public onEventTrigger(event: SpecificAccessNavigationEvent) {
    this.eventTrigger.emit(event);
  }
}
