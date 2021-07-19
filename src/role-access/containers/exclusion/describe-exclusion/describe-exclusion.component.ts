import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExclusionNavigationEvent, ExclusionState } from '../../../models';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-describe-exclusion-cc',
  templateUrl: './describe-exclusion.component.html',
  styleUrls: ['./describe-exclusion.component.scss']
})
export class DescribeExclusionContainerComponent implements OnInit {

  @Input() public navEvent: ExclusionNavigation;

  constructor(private readonly store: Store<fromFeature.State>) {
  }

  public ngOnInit(): void {
  }

  public navigationHandler(navEvent: ExclusionNavigationEvent) {
    switch (navEvent) {
      case ExclusionNavigationEvent.CONTINUE:
        this.store.dispatch(new fromFeature.ChangeNavigation(ExclusionState.CHECK_ANSWERS));
        break;
      default:
        throw new Error('Invalid option');
    }
  }
}
