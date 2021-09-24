import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserRole } from '../../../../app/models';
import {
  backButtonVisibilityStates,
  cancelButtonVisibilityStates,
  confirmButtonVisibilityStates,
  continueButtonVisibilityStates
} from '../../../constants/allocate-role-navigation-visibility-states';
import { Actions, AllocateRoleNavigationEvent, AllocateRoleState, AllocateRoleStateData, RoleCategory } from '../../../models';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-allocate-role-navigation',
  templateUrl: './allocate-role-navigation.component.html',
})
export class AllocateRoleNavigationComponent implements OnInit {

  @Output() public eventTrigger = new EventEmitter();

  public allocateRoleStateData$: Observable<AllocateRoleStateData>;

  public backVisibilityStates = backButtonVisibilityStates;
  public continueVisibilityStates = continueButtonVisibilityStates;
  public confirmExclusionButtonVisibilityStates = confirmButtonVisibilityStates;
  public cancelButtonVisibilityStates = cancelButtonVisibilityStates;

  public allocateRoleNavigationEvent = AllocateRoleNavigationEvent;

  @Input()
  public isLegalOpsOrJudicialRole: UserRole;

  @Input()
  public roleCategory: RoleCategory;

  constructor(
    private readonly store: Store<fromFeature.State>,
  ) {
  }

  public ngOnInit(): void {
    this.allocateRoleStateData$ = this.store.pipe(select(fromFeature.getAllocateRoleState));
  }

  public isBackVisible(currentNavigationState: AllocateRoleState, action: Actions): boolean {
    // when action is reallocate to show/hide the back button depends on the logon user's role and the role category to be added
    if (action === Actions.Reallocate) {
      if (this.isLegalOpsOrJudicialRole === UserRole.Judicial) {
        if (this.roleCategory === RoleCategory.JUDICIAL) {
          if (currentNavigationState === AllocateRoleState.CHOOSE_ALLOCATE_TO) {
            return false;
          }
        } else if (this.roleCategory === RoleCategory.LEGAL_OPERATIONS) {
          if (currentNavigationState === AllocateRoleState.SEARCH_PERSON) {
            return false;
          }
        }
      } else if (this.isLegalOpsOrJudicialRole === UserRole.LegalOps) {
        if (this.roleCategory === RoleCategory.LEGAL_OPERATIONS) {
          if (currentNavigationState === AllocateRoleState.CHOOSE_ALLOCATE_TO) {
            return false;
          }
        } else if (this.roleCategory === RoleCategory.JUDICIAL) {
          if (currentNavigationState === AllocateRoleState.SEARCH_PERSON) {
            return false;
          }
        }
      }
      return true;
    }
    // when action is allocate use the backVisibilityStates
    return this.backVisibilityStates.includes(currentNavigationState);
  }

  public isVisible(currentNavigationState: AllocateRoleState, visibleNavigationStates: AllocateRoleState[]): boolean {
    return visibleNavigationStates.includes(currentNavigationState);
  }

  public onEventTrigger(event: AllocateRoleNavigationEvent): void {
    this.eventTrigger.emit(event);
  }
}
