import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { select, Store } from '@ngrx/store';
import { CaseRole } from 'api/workAllocation2/interfaces/caseRole';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationInfo, UserDetails } from '../../../app/models/user-details.model';
import * as fromRoot from '../../../app/store';
import * as fromCaseList from '../../../app/store/reducers';

@Component({
  selector: 'exui-roles-and-access-container',
  templateUrl: './roles-and-access-container.component.html'
})
export class RolesAndAccessContainerComponent implements OnInit {
  public roles: CaseRole[] = [];
  public caseDetails: CaseView;
  public showAllocateRoleLink: boolean = false;
  public locationInfo$: Observable<LocationInfo>;
  public jurisdictionFieldId = '[JURISDICTION]';

  constructor(private readonly route: ActivatedRoute,
              private readonly store: Store<fromCaseList.State>,
              private readonly appStore: Store<fromRoot.State>) {
  }

  public ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case as CaseView;
    const jurisdictionField = this.caseDetails.metadataFields.find(field => field.id === this.jurisdictionFieldId);
    if (jurisdictionField) {
      const caseJurisdiction = jurisdictionField.value;
      this.appStore.select(fromRoot.getUserDetails).subscribe(user => this.setDisplayAllocateLink(user, caseJurisdiction));
    }
    this.roles = this.route.snapshot.data.roles as CaseRole[];
    this.locationInfo$ = this.store.pipe(
      select(fromRoot.getLocationInfo),
      map((locations: LocationInfo[]) => locations[0])
    );
  }

  public setDisplayAllocateLink(user: UserDetails, caseJurisdiction: any): void {
    // need to check for the case Location once its available
    this.showAllocateRoleLink = user.locationInfo.some(locationInfo => locationInfo.jurisdiction === caseJurisdiction);
  }
}
