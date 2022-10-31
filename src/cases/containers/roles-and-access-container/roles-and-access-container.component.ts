import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CaseView} from '@hmcts/ccd-case-ui-toolkit';
import {Store} from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import {first, map, mergeMap, tap} from 'rxjs/operators';
import {UserDetails} from '../../../app/models/user-details.model';
import {SessionStorageService} from '../../../app/services';
import * as fromRoot from '../../../app/store';
import {CaseRole, CaseRoleDetails, RoleExclusion} from '../../../role-access/models';
import {AllocateRoleService, RoleExclusionsService} from '../../../role-access/services';
import {Caseworker} from '../../../work-allocation/models/dtos';
import {CaseworkerDataService} from '../../../work-allocation/services';
import {Utils} from '../../utils/utils';

@Component({
  selector: 'exui-roles-and-access-container',
  templateUrl: './roles-and-access-container.component.html'
})
export class RolesAndAccessContainerComponent implements OnInit, OnDestroy {
  public caseDetails: CaseView;
  public showAllocateRoleLink: boolean = false;
  public caseworkers$: Observable<Caseworker[]>;
  public exclusions$: Observable<RoleExclusion[]>;
  public roles$: Observable<CaseRole[]>;
  public jurisdictionFieldId = '[JURISDICTION]';
  public caseJurisdiction: string;
  private routerSubscription: Subscription;

  constructor(private readonly route: ActivatedRoute,
              private readonly store: Store<fromRoot.State>,
              private readonly roleExclusionsService: RoleExclusionsService,
              private readonly allocateService: AllocateRoleService,
              private readonly caseworkerDataService: CaseworkerDataService,
              private readonly sessionStorageService: SessionStorageService) {
  }

  public ngOnInit(): void {
    this.routerSubscription = this.route.data.subscribe((data) => {
      console.log('test data', data);
      this.caseDetails = data.case as CaseView;
      this.applyJurisdiction(this.caseDetails);
      const jurisdiction = this.caseDetails.metadataFields.find(field => field.id === this.jurisdictionFieldId);
      // We need this call. No active subscribers are needed
      // as this will enable the loading caseworkers if not
      // present in session storage
      this.caseworkers$ = this.caseworkerDataService.getCaseworkersForServices([jurisdiction.value]).pipe(first());
      this.loadRoles(jurisdiction);
      this.loadExclusions(jurisdiction);
    });
  }

  public loadExclusions(jurisdiction: any): void {
    this.exclusions$ = this.roleExclusionsService.getCurrentUserRoleExclusions(this.caseDetails.case_id, jurisdiction.value, this.caseDetails.case_type.id).pipe(
      mergeMap((exclusions: RoleExclusion[]) => {
        const userIds = Utils.getJudicialUserIdsFromExclusions(exclusions);
        if (userIds && userIds.length > 0) {
          return this.allocateService.getCaseRolesUserDetails(userIds, [jurisdiction.value]).pipe(
            map((caseRolesWithUserDetails: CaseRoleDetails[]) => Utils.mapCaseRolesForExclusions(exclusions, caseRolesWithUserDetails)
            )
          );
        }
        return of(exclusions);
      })
    );
  }

  public loadRoles(jurisdiction: any): void {
    this.roles$ = this.allocateService.getCaseRoles(this.caseDetails.case_id, jurisdiction.value, this.caseDetails.case_type.id).pipe(
      mergeMap((caseRoles: CaseRole[]) => {
        const userIds = Utils.getJudicialUserIds(caseRoles);
        if (userIds && userIds.length > 0) {
          return this.allocateService.getCaseRolesUserDetails(userIds, [jurisdiction.value]).pipe(
            map((caseRolesWithUserDetails: CaseRoleDetails[]) => Utils.mapCaseRoles(caseRoles, caseRolesWithUserDetails))
          );
        }
        return of(caseRoles);
      }),
      tap(roles => {
        if (roles && roles.length > 0) {
          this.sessionStorageService.setItem('caseRoles', roles.map(role => role.roleId).toString());
        }
      })
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

  public ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
