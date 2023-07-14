import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CaseRole } from '../../../role-access/models/case-role.interface';
import { AllocateRoleService } from '../../../role-access/services/allocate-role.service';
import { Caseworker } from '../../../work-allocation/models/dtos';
import { CaseworkerDataService } from '../../../work-allocation/services/caseworker-data.service';
import { WASupportedJurisdictionsService } from '../../../work-allocation/services/wa-supported-jurisdiction.service';
import { RestrictedCase } from '../../models/restricted-case.model';

@Component({
  selector: 'exui-restricted-case-access-container',
  templateUrl: './restricted-case-access-container.component.html'
})
export class RestrictedCaseAccessContainerComponent implements OnInit {
  public caseId: string;
  public caseRoles: CaseRole[];
  public caseWorkers: Caseworker[];
  public idamIds: string[];
  public restrictedCases: RestrictedCase[];

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly allocateService: AllocateRoleService,
              private readonly caseworkerDataService: CaseworkerDataService,
              private readonly waSupportedJurisdictionsService: WASupportedJurisdictionsService) {
  }

  public ngOnInit(): void {
    this.caseId = this.route.snapshot.params.cid;
    this.allocateService.getCaseAccessRolesByCaseId(this.caseId).pipe(
      switchMap((caseRoles) => {
        this.caseRoles = caseRoles;
        return of(this.getUniqueIdamIds());
      }), take(1),
      switchMap(() => this.waSupportedJurisdictionsService.getWASupportedJurisdictions()),
      take(1),
      switchMap((jurisdictions) => this.caseworkerDataService.getCaseworkersForServices(jurisdictions)),
      take(1),
      switchMap((caseworkers) => of(this.getRestrictedCases(caseworkers)))
    ).subscribe(
      (restrictedCases) => this.restrictedCases = restrictedCases,
      () => this.router.navigate(['/', 'service-down']).then(undefined, undefined)
    );
  }

  private getUniqueIdamIds(): string[] {
    const idamIds = this.caseRoles.map((role) => role.actorId);
    this.idamIds = idamIds.filter((value, index) => idamIds.indexOf(value) === index);
    return this.idamIds;
  }

  private getRestrictedCases(caseworkers: Caseworker[]): RestrictedCase[] {
    const restrictedCases: RestrictedCase[] = [];
    this.idamIds.forEach((id) => {
      const user = caseworkers.find((caseworker) => caseworker.idamId === id);
      const caseRole = this.caseRoles.find((role) => role.actorId === id);
      if (user && caseRole) {
        restrictedCases.push({
          user: `${user.firstName} ${user.lastName}`,
          email: user.email,
          role: caseRole.roleName
        });
      }
    });
    return restrictedCases;
  }
}
