import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../../app/store';
import {
  backButtonVisibilityStates,
  cancelButtonVisibilityStates,
  confirmExclusionButtonVisibilityStates,
  continueButtonVisibilityStates
} from '../../../constants';
import { ExclusionNavigationEvent, ExclusionState } from '../../../models';
import * as fromFeature from '../../../store';

@Component({
  standalone: false,

  selector: 'exui-exclusion-navigation',
  templateUrl: 'exclusion-navigation.component.html'

})
export class ExclusionNavigationComponent implements OnInit {
  @Output() public eventTrigger = new EventEmitter();

  public navigationCurrentState$: Observable<ExclusionState>;

  public backVisibilityStates = backButtonVisibilityStates;
  public continueVisibilityStates = continueButtonVisibilityStates;
  public confirmExclusionButtonVisibilityStates = confirmExclusionButtonVisibilityStates;
  public cancelButtonVisibilityStates = cancelButtonVisibilityStates;

  public exclusionNavigationEvent = ExclusionNavigationEvent;

  constructor(
    private readonly store: Store<fromFeature.State>,
    private readonly appStore: Store<fromRoot.State>
  ) {}

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
