import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ExclusionNavigationEvent, ExclusionState } from '../../../models';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-find-person',
  templateUrl: './find-person.component.html',
  styleUrls: ['./find-person.component.scss']
})
export class FindPersonComponent implements OnInit {
  @Input() public navEvent: ExclusionNavigation;

  constructor(private readonly store: Store<fromFeature.State>) {
  }

  ngOnInit() {
  }

  public navigationHandler(navEvent: ExclusionNavigationEvent) {
    switch (navEvent) {
      case ExclusionNavigationEvent.CONTINUE:
        this.store.dispatch(new fromFeature.ChangeNavigation(ExclusionState.DESCRIBE_EXCLUSION));
        break;
      default:
        throw new Error('Invalid option');
    }
  }
}
