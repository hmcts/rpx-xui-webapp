import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Caseworker } from '../../../work-allocation-2/models/dtos';
import { SessionStorageService } from '../../../app/services';
import { handleFatalErrors } from '../../../work-allocation-2/utils';
import { Answer, CaseRole, RemoveAllocationNavigationEvent } from '../../models';
import { CaseRoleDetails } from '../../models/case-role-details.interface';
import { RemoveRoleText } from '../../models/enums/answer-text';
import { AllocateRoleService } from '../../services';

@Component({
  selector: 'exui-remove-role',
  templateUrl: './remove-role.component.html'
})
export class RemoveRoleComponent implements OnInit {

  public removeAllocationNavigationEvent = RemoveAllocationNavigationEvent;
  public answers: Answer[] = [];
  public caption = null;
  public caseId: string;
  public assignmentId: string;
  public heading = RemoveRoleText.heading;
  public hint = RemoveRoleText.hint;
  public role: CaseRole;

  private returnUrl: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly location: Location,
              private readonly allocateRoleService: AllocateRoleService,
              private readonly sessionStorageService: SessionStorageService) {

    }

  public ngOnInit(): void {
    this.returnUrl = window.history.state && window.history.state.returnUrl ? window.history.state.returnUrl : '';
    const paramMap$ = this.route.queryParamMap;
    paramMap$.pipe(mergeMap(queryMap => {
        return this.getRoleAssignmentFromQuery(queryMap);
      })).subscribe((caseRoles: CaseRole[]) => {
        this.role = caseRoles.find(role => role.id === this.assignmentId);
        if (!this.role.email && this.role.actorId) {
          const caseworkers = JSON.parse(this.sessionStorageService.getItem('caseworkers'));
          if (caseworkers) {
            const caseWorker = (caseworkers as Caseworker[]).find(caseworker => caseworker.idamId === this.role.actorId);
            if (caseWorker) {
              this.role.email = caseWorker.email;
            }
          }
        }
        this.populateAnswers(this.role);
    });
  }

  public populateAnswers(assignment: CaseRole): void {
    this.answers.push({label: 'Type of role', value: assignment.name});
    this.answers.push({label: 'Person', value: assignment.email});
  }

  public getRoleAssignmentFromQuery(queryMap: ParamMap): Observable<CaseRole[]> {
    this.assignmentId = queryMap.get('assignmentId');
    this.caseId = queryMap.get('caseId');
    const jurisdiction = queryMap.get('jurisdiction');
    const caseType = queryMap.get('caseType');
    return this.allocateRoleService.getCaseRoles(this.caseId, jurisdiction, caseType, this.assignmentId).pipe(
      mergeMap((caseRoles: CaseRole[]) => this.allocateRoleService.getCaseRolesUserDetails(caseRoles).pipe(
        map((caseRolesWithUserDetails: CaseRoleDetails[]) => {
          return caseRoles.map(role => {
            const userDetails = caseRolesWithUserDetails.find(detail => detail.sidam_id === role.actorId);
            if (!userDetails) {
              return role;
            }
            return {
              ...role,
              name: userDetails.full_name,
              email: userDetails.email_id,
            };
          });
        })
      )),
    );
  }

  public onNavEvent(navEvent: RemoveAllocationNavigationEvent): void {
    switch (navEvent) {
      case RemoveAllocationNavigationEvent.REMOVE_ROLE_ALLOCATION: {
        this.allocateRoleService.removeAllocation(this.assignmentId).subscribe(() =>
        this.router.navigate([this.returnUrl], {
          state: {
              showMessage: true,
              messageText: RemoveRoleText.infoMessage
            }
          }),
        error => {
          console.log(error);
          handleFatalErrors(error.status, this.router);
        }
      );
        break;
      }
      case RemoveAllocationNavigationEvent.CANCEL: {
        this.location.back();
        return;
      }
      default: {
        throw new Error('Invalid option');
      }
    }
  }

}
