import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';

import { CaseRole, RoleCategory, RoleExclusion } from '../../../role-access/models';
import { Caseworker } from '../../../work-allocation-2/models/dtos';

@Component({
  selector: 'exui-roles-and-access',
  templateUrl: './roles-and-access.component.html'
})
export class RolesAndAccessComponent implements OnInit {
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
  }

  public ngOnInit(): void {
    this.caseId = this.caseDetails.case_id;
    const jurisdictionField = this.caseDetails.metadataFields.find(field => field.id === this.jurisdictionFieldId);
    if (jurisdictionField) {
      this.jurisdiction = jurisdictionField.value;
    }
  }

  public ngOnChanges(): void {
    if (this.legalOpsRoles && !this.caseworkers) {
      this.legalRolesNotNamed = true;
    };
    if (this.exclusions && !this.caseworkers) {
      this.exclusionsNotNamed = true;
    }
    if (this.caseworkers && this.legalOpsRoles) {
      if (this.legalOpsRoles.length > 0 && this.legalRolesNotNamed) {
      this.legalOpsRoles.forEach(
        role => {
          const caseWorker = this.caseworkers.find(caseworker => caseworker.idamId === role.actorId);
          if (caseWorker) {
            role.name = `${caseWorker.firstName}-${caseWorker.lastName}`;
          }
        }
      );
      }
      this.namedLegalRoles = this.legalOpsRoles;
    }
    if (this.caseworkers && this.exclusions) {
      if (this.exclusions.length > 0 && this.exclusionsNotNamed) {
      this.exclusions.forEach(
        exclusion => {
          const caseWorker = this.caseworkers.find(caseworker => caseworker.idamId === exclusion.actorId);
          if (caseWorker) {
            exclusion.name = `${caseWorker.firstName}-${caseWorker.lastName}`;
          }
        }
      );
      }
      this.namedLegalRoles = this.legalOpsRoles;
    }
  }
}
