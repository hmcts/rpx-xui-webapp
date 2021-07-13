import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../app/store';
import {RoleAllocationType } from '../../../cases/enums/allocation-type';

@Component({
  selector: 'exui-allocate-role-container',
  templateUrl: './allocate-role-container.component.html'
})
export class AllocateRoleContainerComponent implements OnInit {

  public roleAllocationType: RoleAllocationType;
  public includeOther: boolean = false;
  public locationInfo$: Observable<any>;

  constructor(
    private readonly store: Store<fromRoot.State>,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.roleAllocationType = this.activatedRoute.snapshot.data.allocation as RoleAllocationType;
    // currently the case allocator role information is stored in location info
    this.locationInfo$ = this.store.pipe(select(fromRoot.getLocationInfo));
    this.locationInfo$.subscribe(li => {
      const firstLocationInfo = li[0];
      this.includeOther = firstLocationInfo && firstLocationInfo.isCaseAllocator ? firstLocationInfo.isCaseAllocator : false;
    });
  }

}
