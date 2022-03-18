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
import { ExclusionNavigationEvent, ExclusionState, SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-specific-access-navigation',
  templateUrl: 'specific-access-navigation.component.html'
})
export class SpecificAccessNavigationComponent implements OnInit {

  @Output() public eventTrigger = new EventEmitter();

  public navigationCurrentState$: Observable<SpecificAccessState>;

  public backVisibilityStates = backButtonVisibilityStates;
  public continueVisibilityStates = continueButtonVisibilityStates;
  public cancelButtonVisibilityStates = cancelButtonVisibilityStates;

  public exclusionNavigationEvent = ExclusionNavigationEvent;

  constructor(
    private store: Store<fromFeature.State>,
    private appStore: Store<fromRoot.State>
  ) {
  }

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
