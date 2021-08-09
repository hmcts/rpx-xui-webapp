import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { select, Store } from '@ngrx/store';
import { CaseRole } from 'api/workAllocation2/interfaces/caseRole';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromRoot from '../../../app/store';
import * as fromCaseList from '../../../app/store/reducers';
import { LocationInfo } from '../../../app/store/reducers/app-config.reducer';

@Component({
  selector: 'exui-roles-and-access-container',
  templateUrl: './roles-and-access-container.component.html'
})
export class RolesAndAccessContainerComponent implements OnInit {
  public roles: CaseRole[] = [];
  public caseDetails: CaseView;
  public locationInfo$: Observable<LocationInfo>;

  constructor(private readonly route: ActivatedRoute, private readonly store: Store<fromCaseList.State>) {
  }

  public ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case as CaseView;
    this.roles = this.route.snapshot.data.roles as CaseRole[];
    this.locationInfo$ = this.store.pipe(
      select(fromRoot.getLocationInfo),
      map((locations: LocationInfo[]) => locations[0])
    );
  }

}
