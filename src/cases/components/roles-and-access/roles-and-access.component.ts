import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';

import { CaseRole, RoleCategory, RoleExclusion } from '../../../role-access/models';
import { Caseworker } from '../../../work-allocation-2/models/dtos';

@Component({
  selector: 'exui-roles-and-access',
  templateUrl: './roles-and-access.component.html'
})
export class RolesAndAccessComponent implements OnInit, OnChanges {
  public namedExclusions: RoleExclusion[];
  public exclusionsNotNamed: boolean = false;
  public legalOpsRoles: CaseRole[] = [];
  public namedLegalRoles: CaseRole[];
  public legalRolesNotNamed: boolean = false;
  public judicialRoles: CaseRole[] = [];
  public legalOps: RoleCategory = RoleCategory.LEGAL_OPERATIONS;
  public judicial: RoleCategory = RoleCategory.JUDICIAL;
  public caseId: string;
  public jurisdiction: string;

  @Input() public exclusions: RoleExclusion[] = [];
  @Input() public showAllocateRoleLink: boolean = false;
  @Input() public caseDetails: CaseView;
  @Input() public caseworkers: Caseworker[];

  private pRoles: CaseRole[] = [];
  public jurisdictionFieldId = '[JURISDICTION]';
  public showLegalOpsAllocate: boolean;

  public get roles(): CaseRole[] {
    return this.pRoles;
  }

  @Input()
  public set roles(value: CaseRole[]) {
    this.pRoles = value;
    if (this.roles) {
      this.legalOpsRoles = this.roles.filter(role => role.roleCategory === RoleCategory.LEGAL_OPERATIONS);
      this.judicialRoles = this.roles.filter(role => role.roleCategory === RoleCategory.JUDICIAL);
    }
    this.showLegalOpsAllocate = this.showAllocateRoleLink && this.legalOpsRoles.length === 0;
  }

  public ngOnInit(): void {
    this.caseId = this.caseDetails.case_id;
    const jurisdictionField = this.caseDetails.metadataFields.find(field => field.id === this.jurisdictionFieldId);
    if (jurisdictionField) {
      this.jurisdiction = jurisdictionField.value;
    }
  }

  public ngOnChanges(): void {
    // All of the below is in order to ensure the name is shown for roles if present
    // if not present this will be ignored
    if (this.legalOpsRoles && this.legalOpsRoles.length > 0 && !this.legalOpsRoles[0].name) {
      // checking one name will reveal whether caseworker names are avaiable
      this.legalRolesNotNamed = true;
    };
    if (this.exclusions && this.exclusions.length > 0) {
      for (const exclusion of this.exclusions) {
        // some exclusions are judicial so this checks whether any exclusion is missing a name
        if (exclusion.userType === RoleCategory.LEGAL_OPERATIONS) {
          if (!exclusion.name) {
            this.exclusionsNotNamed = true;
          } else {
            break;
          }
        }
      }
    }
    if (this.caseworkers && this.legalOpsRoles && this.legalOpsRoles.length > 0) {
      this.namedLegalRoles = this.checkSetNamedRoles(this.legalOpsRoles, this.legalRolesNotNamed);
    }
    if (this.caseworkers && this.exclusions && this.exclusions.length > 0) {
      this.namedExclusions = this.checkSetNamedRoles(this.exclusions, this.exclusionsNotNamed);
    }
  }

  private checkSetNamedRoles(roles: any[], notNamed: boolean): any[] {
    if (notNamed) {
      roles.forEach(
        role => {
          const caseWorker = this.caseworkers.find(caseworker => caseworker.idamId === role.actorId);
          if (caseWorker) {
            role.name = `${caseWorker.firstName} ${caseWorker.lastName}`;
          }
        }
      );
    }
    return roles;
  }
}
