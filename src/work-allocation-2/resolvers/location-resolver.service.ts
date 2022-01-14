import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError, first, map, mergeMap } from 'rxjs/operators';
import { CaseRoleDetails } from '../../role-access/models/case-role-details.interface';
import { AppUtils } from '../../app/app-utils';
import { UserDetails, UserRole } from '../../app/models/user-details.model';
import * as fromRoot from '../../app/store';
import * as fromCaseList from '../../app/store/reducers';
import { Caseworker, Location } from '../models/dtos';
import { CaseworkerDataService } from '../services';
import { JudicialWorkerDataService } from '../services/judicialworker-data.service';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class LocationResolver implements Resolve<Location> {

  private userRole: string 

  constructor(
    private readonly store: Store<fromCaseList.State>,
    private readonly router: Router,
    private readonly caseworkerDataService: CaseworkerDataService,
    private readonly judicialWorkerDataService: JudicialWorkerDataService
  ) {
  }

  public resolve(): Observable<any> {
    return this.userDetails()
      .pipe(
        first(),
        mergeMap((userDetails: UserDetails) => this.getJudicialWorkersOrCaseWorkers(userDetails)
          .pipe(
            map((caseWorkers) => {
              this.extractLocation(userDetails, caseWorkers);
            })
          )
        ),
        catchError(error => {
          handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
          return EMPTY;
        })
      );
  }

  private userDetails(): Observable<UserDetails> {
    return this.store.pipe(select(fromRoot.getUserDetails));
  }

  private extractLocation(userDetails: UserDetails, workers: any): Location {
    const id = userDetails.userInfo.id ? userDetails.userInfo.id : userDetails.userInfo.uid;
    if (workers && workers.length > 0 && workers[0].idamId) {
      const worker = workers.find((cw: Caseworker) => cw.idamId === id);
      return worker ? worker.location : null;
    } else {
      if (workers && workers.length > 0) {
        const worker = (workers as CaseRoleDetails[])[0];
        const jAppt = worker.appointments.find(appt => appt.location !== 'National' && appt.epimms_id && appt.epimms_id !== '');
        if (jAppt) {
          return { id: jAppt.epimms_id, locationName: jAppt.location, services: [] }
        }
      }
      return null;
    }
  }

  private getJudicialWorkersOrCaseWorkers(userDetails: UserDetails): Observable<any[]> {
    const id = userDetails.userInfo.id ? userDetails.userInfo.id : userDetails.userInfo.uid;
    this.userRole = AppUtils.isLegalOpsOrJudicial(userDetails.userInfo.roles);
    let jurisdictions: string[] = [];
    userDetails.roleAssignmentInfo.forEach(roleAssignment => {
      const roleJurisdiction = roleAssignment.jurisdiction;
      if (roleJurisdiction && !jurisdictions.includes(roleJurisdiction)) {
        jurisdictions.push(roleJurisdiction);
      }
    })
    return this.userRole === UserRole.Judicial ? this.judicialWorkerDataService.getCaseRolesUserDetails([id]) : this.caseworkerDataService.getCaseworkersForServices(jurisdictions);
  }
}
