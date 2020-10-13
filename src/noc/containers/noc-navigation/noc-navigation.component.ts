import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NocState } from '../../models/noc-state.enum';
import { backButtonVisibilityStates, continueButtonVisibilityStates, submitButtonVisibilityStates } from '../../constants/navigationVisibilityStates';
import * as fromFeature from '../../store';

@Component({
  selector: 'exui-noc-navigation',
  templateUrl: 'noc-navigation.component.html'
})
export class NocNavigationComponent implements OnInit {

  @Output() back = new EventEmitter();
  @Output() continue = new EventEmitter();
  @Output() submit = new EventEmitter();

  public nocNavigationCurrentState$: Observable<fromFeature.State>;

  public backVisibilityStates = backButtonVisibilityStates;
  public continueVisibilityStates = continueButtonVisibilityStates;
  public submitVisibilityStates = submitButtonVisibilityStates;

  constructor(
    private store: Store<fromFeature.State>,
  ) { }

  ngOnInit() {
    this.nocNavigationCurrentState$ = this.store.pipe(select(fromFeature.currentNavigation));
  }

  public isVisible(currentNavigationState: NocState, visibleNavigationStates: NocState[]): boolean {
    return visibleNavigationStates.includes(currentNavigationState);
  }

  public onBack(event) {
    this.back.emit(event);
  }

  public onContinue(event) {
    this.continue.emit(event);
  }

  public onSubmit(event) {
    this.submit.emit(event);
  }

}
