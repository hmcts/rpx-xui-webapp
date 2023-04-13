import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  backButtonVisibilityStates,
  backButtonVisibilityStatesIfReallocate,
  cancelButtonVisibilityStates,
  confirmButtonVisibilityStates,
  continueButtonVisibilityStates
} from '../../../constants/allocate-role-navigation-visibility-states';
import { Actions, AllocateRoleNavigationEvent, AllocateRoleState, AllocateRoleStateData } from '../../../models';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-allocate-role-navigation',
  templateUrl: './allocate-role-navigation.component.html'
})
export class AllocateRoleNavigationComponent implements OnInit {
  @Output() public eventTrigger = new EventEmitter();

  public allocateRoleStateData$: Observable<AllocateRoleStateData>;

  public backVisibilityStates = backButtonVisibilityStates;
  public backButtonVisibilityStatesIfReallocate = backButtonVisibilityStatesIfReallocate;
  public continueVisibilityStates = continueButtonVisibilityStates;
  public confirmExclusionButtonVisibilityStates = confirmButtonVisibilityStates;
  public cancelButtonVisibilityStates = cancelButtonVisibilityStates;

  public allocateRoleNavigationEvent = AllocateRoleNavigationEvent;

  constructor(
    private readonly store: Store<fromFeature.State>,
  ) {}

  public ngOnInit(): void {
    this.allocateRoleStateData$ = this.store.pipe(select(fromFeature.getAllocateRoleState));
  }

  public isBackVisible(currentNavigationState: AllocateRoleState, action: Actions): boolean {
    if (action === Actions.Reallocate) {
      return this.backButtonVisibilityStatesIfReallocate.includes(currentNavigationState);
    }
    return this.backVisibilityStates.includes(currentNavigationState);
  }

  public isVisible(currentNavigationState: AllocateRoleState, visibleNavigationStates: AllocateRoleState[]): boolean {
    return visibleNavigationStates.includes(currentNavigationState);
  }

  public onEventTrigger(event: AllocateRoleNavigationEvent): void {
    this.eventTrigger.emit(event);
  }
}
