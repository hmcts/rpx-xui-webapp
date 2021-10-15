import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Caseworker } from '../../../work-allocation-2/models/dtos';
import { SessionStorageService } from '../../../app/services';
import { handleFatalErrors } from '../../../work-allocation-2/utils';
import { Answer, CaseRole, RemoveAllocationNavigationEvent } from '../../models';
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

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly allocateRoleService: AllocateRoleService,
              private readonly sessionStorageService: SessionStorageService) {}

  public ngOnInit(): void {
    const paramMap$ = this.route.queryParamMap;
    paramMap$.pipe(mergeMap(queryMap => {
        return this.getRoleAssignmentFromQuery(queryMap);
      })).subscribe((caseRoles: CaseRole[]) => {
        console.log('caseRoles', caseRoles);
        this.role = caseRoles.find(role => role.id === this.assignmentId);
        if (!this.role.email && this.role.actorId) {
          const caseworkers = JSON.parse(this.sessionStorageService.getItem('caseworkers'));
          if (caseworkers) {
            const caseWorker = (caseworkers as Caseworker[]).find(caseworker => caseworker.idamId === this.role.actorId);
            this.role.email = caseWorker.email;
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
    return this.allocateRoleService.getCaseRoles(this.caseId, jurisdiction, caseType, this.assignmentId);
  }

  public onNavEvent(navEvent: RemoveAllocationNavigationEvent): void {
    const goToCaseUrl = `cases/case-details/${this.caseId}/roles-and-access`;
    switch (navEvent) {
      case RemoveAllocationNavigationEvent.REMOVE_ROLE_ALLOCATION: {
        this.allocateRoleService.removeAllocation(this.assignmentId).subscribe(() =>
        this.router.navigate([goToCaseUrl], {
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
        this.router.navigateByUrl(goToCaseUrl);
        return;
      }
      default: {
        throw new Error('Invalid option');
      }
    }
  }
}
