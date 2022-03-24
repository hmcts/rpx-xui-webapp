import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { SpecificAccessNavigationEvent } from '../../../models';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-specific-access-approved',
  templateUrl: './specific-access-approved.component.html'
})
export class SpecificAccessApprovedComponent {
  @Input() public navEvent: SpecificAccessNavigationEvent;
  public subscription: Subscription;
  public services: string[];
  public assignedUser: string;

  constructor(private readonly store: Store<fromFeature.State>) {
  }

  public navigationHandler(navEvent: SpecificAccessNavigationEvent): void {
    switch (navEvent) {
      default:
        throw new Error('Not yet implemented');
    }
  }
}
