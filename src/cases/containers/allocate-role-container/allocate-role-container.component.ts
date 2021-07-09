import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AllocationType } from '../../../cases/enums/allocation-type';

@Component({
  selector: 'exui-allocate-role-container',
  templateUrl: './allocate-role-container.component.html'
})
export class AllocateRoleContainerComponent implements OnInit {

  public allocationType: AllocationType;
  public includeOther: boolean = true;

  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.allocationType = this.activatedRoute.snapshot.data.allocation as AllocationType;
    // temporary check to enable discrepancy in displaying 'other' radio button
    // will be replaced with alternative parameter, user's case allocator role
    if (this.allocationType === 'ExclusionSelf') {
      this.allocationType = AllocationType.Exclusion;
      this.includeOther = false;
    }
  }

}
