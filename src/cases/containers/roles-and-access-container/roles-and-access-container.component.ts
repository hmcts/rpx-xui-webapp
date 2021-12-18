import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, map, mergeMap } from 'rxjs/operators';
import { getJudicialUserIds, getJudicialUserIdsFromExclusions, mapCaseRoles, mapCaseRolesForExclusions } from '../../../cases/utils/utils';
import { UserDetails } from '../../../app/models/user-details.model';
import * as fromRoot from '../../../app/store';
import { CaseRole, RoleExclusion } from '../../../role-access/models';
import { Caseworker } from '../../../work-allocation-2/models/dtos';
import { CaseRoleDetails } from '../../../role-access/models/case-role-details.interface';
import { AllocateRoleService, RoleExclusionsService } from '../../../role-access/services';
import { CaseworkerDataService } from '../../../work-allocation-2/services';

@Component({
  selector: 'exui-roles-and-access-container',
  templateUrl: './roles-and-access-container.component.html'
})
export class RolesAndAccessContainerComponent implements OnInit {
  public caseDetails: CaseView;
  public showAllocateRoleLink: boolean = false;
  public caseworkers$: Observable<Caseworker[]>;
  public exclusions$: Observable<RoleExclusion[]>;
  public roles$: Observable<CaseRole[]>;
  public jurisdictionFieldId = '[JURISDICTION]';
  public caseJurisdiction: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly store: Store<fromRoot.State>,
              private readonly roleExclusionsService: RoleExclusionsService,
              private readonly allocateService: AllocateRoleService,
              private readonly caseworkerDataService: CaseworkerDataService) {
  }

  public ngOnInit(): void {
    // We need this call. No active subscribers are needed
    // as this will enable the loading caseworkers if not
    // present in session storage
    this.caseworkers$ = this.caseworkerDataService.getAll().pipe(first());

    this.caseDetails = this.route.snapshot.data.case as CaseView;
    this.applyJurisdiction(this.caseDetails);
    const jurisdiction = this.caseDetails.metadataFields.find(field => field.id === this.jurisdictionFieldId);
    this.loadRoles(jurisdiction);
    this.loadExclusions(jurisdiction);

    // We need this call. No active subscribers are needed
    // as this will enable the loading caseworkers if not
    // present in session storage
    this.caseworkerDataService.getAll().pipe(first()).subscribe();
    this.exclusions$ = this.roleExclusionsService.getCurrentUserRoleExclusions(this.caseDetails.case_id, jurisdiction.value, this.caseDetails.case_type.id);
  }

  public loadExclusions(jurisdiction: any) {
    this.exclusions$ = this.roleExclusionsService.getCurrentUserRoleExclusions(this.caseDetails.case_id, jurisdiction.value, this.caseDetails.case_type.id).pipe(
      mergeMap((exclusions: RoleExclusion[]) => this.allocateService.getCaseRolesUserDetails(getJudicialUserIdsFromExclusions(exclusions)).pipe(
        map((caseRolesWithUserDetails: CaseRoleDetails[]) => mapCaseRolesForExclusions(exclusions, caseRolesWithUserDetails))
      ))
    );
  }

  public loadRoles(jurisdiction: any) {
    this.roles$ = this.allocateService.getCaseRoles(this.caseDetails.case_id, jurisdiction.value, this.caseDetails.case_type.id).pipe(
      mergeMap((caseRoles: CaseRole[]) => this.allocateService.getCaseRolesUserDetails(getJudicialUserIds(caseRoles)).pipe(
        map((caseRolesWithUserDetails: CaseRoleDetails[]) => mapCaseRoles(caseRoles, caseRolesWithUserDetails))
      ))
    );
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
