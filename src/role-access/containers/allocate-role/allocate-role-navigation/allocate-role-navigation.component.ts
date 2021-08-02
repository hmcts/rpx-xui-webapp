import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  backButtonVisibilityStates,
  cancelButtonVisibilityStates,
  confirmButtonVisibilityStates,
  continueButtonVisibilityStates
} from '../../../constants/allocate-role-navigation-visibility-states';
import { AllocateRoleNavigationEvent, AllocateRoleState } from '../../../models';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-allocate-role-navigation',
  templateUrl: './allocate-role-navigation.component.html',
})
export class AllocateRoleNavigationComponent implements OnInit {

  @Output() public eventTrigger = new EventEmitter();

  public navigationCurrentState$: Observable<AllocateRoleState>;

  public backVisibilityStates = backButtonVisibilityStates;
  public continueVisibilityStates = continueButtonVisibilityStates;
  public confirmExclusionButtonVisibilityStates = confirmButtonVisibilityStates;
  public cancelButtonVisibilityStates = cancelButtonVisibilityStates;

  public allocateRoleNavigationEvent = AllocateRoleNavigationEvent;

  constructor(
    private store: Store<fromFeature.State>,
  ) {
  }

  public ngOnInit(): void {
    this.navigationCurrentState$ = this.store.pipe(select(fromFeature.getAllocateRoleActiveState));
  }

  public isVisible(currentNavigationState: AllocateRoleState, visibleNavigationStates: AllocateRoleState[]): boolean {
    return visibleNavigationStates.includes(currentNavigationState);
  }

  public onEventTrigger(event: AllocateRoleNavigationEvent) {
    this.eventTrigger.emit(event);
  }
}
