import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocNavigationEvent, NocState } from '../../models';
import { backButtonVisibilityStates, continueButtonVisibilityStates, submitButtonVisibilityStates, setAnswersButtonVisibilityStates, checkAnswersButtonVisibilityStates } from '../../constants';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-navigation',
  templateUrl: 'noc-navigation.component.html',
  styleUrls: ['noc-navigation.component.scss']
})
export class NocNavigationComponent implements OnInit {

  @Output() eventTrigger = new EventEmitter();

  public nocNavigationCurrentState$: Observable<fromFeature.State>;

  public backVisibilityStates = backButtonVisibilityStates;
  public continueVisibilityStates = continueButtonVisibilityStates;
  public submitVisibilityStates = submitButtonVisibilityStates;
  public setAnswersButtonVisibilityStates = setAnswersButtonVisibilityStates;
  public checkAnswersButtonVisibilityStates = checkAnswersButtonVisibilityStates;

  public nocNavigationEvent = NocNavigationEvent;

  constructor(
    private store: Store<fromFeature.State>,
  ) { }

  ngOnInit() {
    this.nocNavigationCurrentState$ = this.store.pipe(select(fromFeature.currentNavigation));
  }

  public isVisible(currentNavigationState: NocState, visibleNavigationStates: NocState[]): boolean {
    return visibleNavigationStates.includes(currentNavigationState);
  }

  public onEventTrigger(event: NocNavigationEvent) {
    this.eventTrigger.emit(event);
  }

}
