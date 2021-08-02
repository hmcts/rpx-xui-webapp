import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AllocateRoleState } from '../../../models';
import { AllocateRoleNavigationEvent } from '../../../models/allocate-role-navigation-event.enum';
import { AllocateRoleNavigation } from '../../../models/allocate-role-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-choose-duration',
  templateUrl: './choose-duration.component.html',
  styleUrls: ['./choose-duration.component.scss']
})
export class ChooseDurationComponent implements OnInit {

  @Input() public navEvent: AllocateRoleNavigation;

  constructor(private readonly store: Store<fromFeature.State>) { }

  public ngOnInit(): void {
  }

  public navigationHandler(navEvent: AllocateRoleNavigationEvent) {
    switch (navEvent) {
      case AllocateRoleNavigationEvent.CONTINUE:
        this.store.dispatch(new fromFeature.AllocateRoleChangeNavigation(AllocateRoleState.CHECK_ANSWERS));
        break;
      default:
        throw new Error('Invalid option');
    }
  }
}
