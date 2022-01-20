import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs/Observable';
import { catchError, first, map, mergeMap } from 'rxjs/operators';
import { LocationModel } from '../../../api/locations/models/location.model';

import { AppUtils } from '../../app/app-utils';
import { UserDetails, UserRole } from '../../app/models';
import * as fromRoot from '../../app/store';
import * as fromCaseList from '../../app/store/reducers';
import { CaseRoleDetails } from '../../role-access/models/case-role-details.interface';
import { AllocateRoleService } from '../../role-access/services';
import { Caseworker, Location } from '../models/dtos';
import { CaseworkerDataService } from '../services';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class LocationResolver implements Resolve<LocationModel> {

  private userRole: string;

  constructor(
    private readonly store: Store<fromCaseList.State>,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly caseworkerDataService: CaseworkerDataService,
    private readonly allocateRoleService: AllocateRoleService
  ) {
  }

  public resolve(): Observable<LocationModel> {
    return this.userDetails()
      .pipe(
        first(),
        mergeMap((userDetails: UserDetails) => this.getJudicialWorkersOrCaseWorkers(userDetails)
          .pipe(
            map((caseWorkers) => this.extractLocation(userDetails, caseWorkers)),
          )
        ),
        mergeMap((location: Location) => this.getLocations(location)),
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
      return worker && worker.location && worker.location.id ? worker.location : null;
    } else {
      if (workers && workers.length > 0) {
        const worker = (workers as CaseRoleDetails[])[0];
        const jAppt = worker.appointments.find(appt => appt.location !== 'National' && appt.epimms_id && appt.epimms_id !== '');
        if (jAppt) {
          return { id: jAppt.epimms_id, locationName: jAppt.location, services: [] };
        }
      }
      return null;
    }
  }

  private getJudicialWorkersOrCaseWorkers(userDetails: UserDetails): Observable<any[]> {
    const id = userDetails.userInfo.id ? userDetails.userInfo.id : userDetails.userInfo.uid;
    this.userRole = AppUtils.isLegalOpsOrJudicial(userDetails.userInfo.roles);
    const jurisdictions: string[] = [];
    userDetails.roleAssignmentInfo.forEach(roleAssignment => {
      const roleJurisdiction = roleAssignment.jurisdiction;
      if (roleJurisdiction && !jurisdictions.includes(roleJurisdiction)) {
        jurisdictions.push(roleJurisdiction);
      }
    })
    return this.userRole === UserRole.Judicial ? this.allocateRoleService.getCaseRolesUserDetails([id], jurisdictions) : this.caseworkerDataService.getCaseworkersForServices(jurisdictions);
  }

  private getLocations(location: Location): Observable<LocationModel> {
    if (!location) {
      return of(null);
    }
    return this.http.get<LocationModel>(`api/locations/getLocationsById?ids=${location.id}`);
  }
}
