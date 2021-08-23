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
import { RoleExclusion } from '../../../role-access/models';
import { RoleExclusionsService } from '../../../role-access/services';

@Component({
  selector: 'exui-roles-and-access-container',
  templateUrl: './roles-and-access-container.component.html'
})
export class RolesAndAccessContainerComponent implements OnInit {
  public roles: CaseRole[] = [];
  public caseDetails: CaseView;
  public showAllocateRoleLink: boolean = false;
  public exclusions$: Observable<RoleExclusion[]>;
  public locationInfo$: Observable<LocationInfo>;
  public jurisdictionFieldId = '[JURISDICTION]';

  constructor(private readonly route: ActivatedRoute,
              private readonly store: Store<fromCaseList.State>,
              private readonly appStore: Store<fromRoot.State>,
              private readonly roleExclusionsService: RoleExclusionsService) {
  }

  public ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case as CaseView;
    this.applyJurisdiction(this.caseDetails);
    this.roles = this.route.snapshot.data.roles as CaseRole[];
    this.exclusions$ = this.roleExclusionsService.getCurrentUserRoleExclusions();
    this.locationInfo$ = this.store.pipe(
      select(fromRoot.getLocationInfo),
      map((locations: LocationInfo[]) => locations[0])
    );
  }

  public applyJurisdiction(caseDetails: CaseView): void {
    const jurisdictionField = caseDetails.metadataFields.find(field => field.id === this.jurisdictionFieldId);
    if (jurisdictionField) {
      const caseJurisdiction = jurisdictionField.value;
      this.appStore.select(fromRoot.getUserDetails).subscribe(user => this.setDisplayAllocateLink(user, caseJurisdiction));
    }
  }

  public setDisplayAllocateLink(user: UserDetails, caseJurisdiction: any): void {
    if (user && user.locationInfo) {
      this.showAllocateRoleLink = user.locationInfo.some(locationInfo => locationInfo.jurisdiction === caseJurisdiction);
    }
  }
}
