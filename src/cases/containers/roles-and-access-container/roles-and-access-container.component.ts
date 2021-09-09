import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserDetails } from '../../../app/models/user-details.model';
import * as fromRoot from '../../../app/store';
import { CaseRole, RoleExclusion } from '../../../role-access/models';
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
  public jurisdictionFieldId = '[JURISDICTION]';
  public caseJurisdiction: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly store: Store<fromRoot.State>,
              private readonly roleExclusionsService: RoleExclusionsService) {
  }

  public ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case as CaseView;
    this.applyJurisdiction(this.caseDetails);
    this.roles = this.route.snapshot.data.roles as CaseRole[];
    this.exclusions$ = this.roleExclusionsService.getCurrentUserRoleExclusions();
  }

  public applyJurisdiction(caseDetails: CaseView): void {
    const jurisdictionField = caseDetails.metadataFields.find(field => field.id === this.jurisdictionFieldId);
    if (jurisdictionField) {
      this.caseJurisdiction = jurisdictionField.value;
      this.store.select(fromRoot.getUserDetails).subscribe(user => this.setDisplayAllocateLink(user, this.caseJurisdiction));
    }
  }

  public setDisplayAllocateLink(user: UserDetails, caseJurisdiction: any): void {
    if (user && user.roleAssignmentInfo) {
      this.showAllocateRoleLink = user.roleAssignmentInfo.some(roleAssignmentInfo => roleAssignmentInfo.isCaseAllocator && roleAssignmentInfo.jurisdiction === caseJurisdiction);
    }
  }
}
