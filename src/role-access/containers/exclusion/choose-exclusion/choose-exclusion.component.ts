import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExclusionNavigationEvent, ExclusionState } from '../../../models';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-choose-exclusion',
  templateUrl: './choose-exclusion.component.html',
  styleUrls: ['./choose-exclusion.component.scss']
})
export class ChooseExclusionComponent implements OnInit {

  @Input() public navEvent: ExclusionNavigation;

  constructor(private readonly store: Store<fromFeature.State>) {
  }

  public ngOnInit(): void {
  }

  public navigationHandler(navEvent: ExclusionNavigationEvent) {
    switch (navEvent) {
      case ExclusionNavigationEvent.CONTINUE:
        // TODO if selected option is exclude me
        // this.store.dispatch(new fromFeature.ChangeNavigation(ExclusionState.CHOOSE_EXCLUSION));
        // TODO if selected option is exclude another person
        this.store.dispatch(new fromFeature.ChangeNavigation(ExclusionState.CHOOSE_PERSON_ROLE));
        break;
      default:
        throw new Error('Invalid option');
    }
  }
}
