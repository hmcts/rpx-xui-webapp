import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CaseworkerDataService } from '../../../work-allocation-2/services';
import { UserDetails } from '../../../app/models/user-details.model';
import * as fromRoot from '../../../app/store';
import { CaseRole, RoleExclusion } from '../../../role-access/models';
import { RoleExclusionsService } from '../../../role-access/services';
import { AllocateRoleService } from '../../../role-access/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'exui-roles-and-access-container',
  templateUrl: './roles-and-access-container.component.html'
})
export class RolesAndAccessContainerComponent implements OnInit {
  public caseDetails: CaseView;
  public showAllocateRoleLink: boolean = false;
  public exclusions$: Observable<RoleExclusion[]>;
  public roles$: Observable<CaseRole[]>;
  public jurisdictionFieldId = '[JURISDICTION]';
  public caseJurisdiction: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly store: Store<fromRoot.State>,
              private readonly roleExclusionsService: RoleExclusionsService,
              private readonly allocateService: AllocateRoleService,
              private readonly caseworkerDataService: CaseworkerDataService) {}

  public ngOnInit(): void {
    this.caseDetails = this.route.snapshot.data.case as CaseView;
    this.applyJurisdiction(this.caseDetails);
    const jurisdiction = this.caseDetails.metadataFields.find(field => field.id === this.jurisdictionFieldId);
    this.roles$ = this.allocateService.getCaseRoles(this.caseDetails.case_id, jurisdiction.value, this.caseDetails.case_type.id);
    this.exclusions$ = this.roleExclusionsService.getCurrentUserRoleExclusions(this.caseDetails.case_id, jurisdiction.value, this.caseDetails.case_type.id);

    // We need this call. No active subscribers are needed
    // as this will enable the loading caseworkers if not
    // present in session storage
    this.caseworkerDataService.getAll().pipe(first()).subscribe();
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
