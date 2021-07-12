import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../app/store';
import { AllocationType } from '../../../cases/enums/allocation-type';

@Component({
  selector: 'exui-allocate-role-container',
  templateUrl: './allocate-role-container.component.html'
})
export class AllocateRoleContainerComponent implements OnInit {

  public allocationType: AllocationType;
  public includeOther: boolean = true;
  public locationInfo$: Observable<any>;

  constructor(
    private readonly store: Store<fromRoot.State>,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.allocationType = this.activatedRoute.snapshot.data.allocation as AllocationType;
    // currently the case allocator role information is stored in location info
    this.locationInfo$ = this.store.pipe(select(fromRoot.getLocationInfo));
    this.locationInfo$.subscribe(li => {
      this.includeOther = li[0].isCaseAllocator;
    });
  }

}
