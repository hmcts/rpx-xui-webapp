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
import { SessionStorageService } from '../../app/services';
import * as fromRoot from '../../app/store';
import * as fromCaseList from '../../app/store/reducers';
import { CaseRoleDetails } from '../../role-access/models/case-role-details.interface';
import { AllocateRoleService } from '../../role-access/services';
import { Caseworker, Location, LocationsByService } from '../models/dtos';
import { CaseworkerDataService } from '../services';
import { addLocationToLocationsByService, addLocationToLocationsByServiceCode, getServiceFromServiceCode, handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class LocationResolver implements Resolve<LocationModel[]> {

  private userRole: string;

  constructor(
    private readonly store: Store<fromCaseList.State>,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly caseworkerDataService: CaseworkerDataService,
    private readonly allocateRoleService: AllocateRoleService,
    private readonly sessionStorageService: SessionStorageService
  ) {
  }

  public resolve(): Observable<LocationModel[]> {
    return this.userDetails()
      .pipe(
        first(),
        mergeMap((userDetails: UserDetails) => this.getJudicialWorkersOrCaseWorkers(userDetails)
          .pipe(
            map((caseWorkers) => this.extractLocations(userDetails, caseWorkers)),
          )
        ),
        mergeMap((location: Location[]) => this.getLocations(location)),
        catchError(error => {
          handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
          return EMPTY;
        })
      );
  }

  private userDetails(): Observable<UserDetails> {
    return this.store.pipe(select(fromRoot.getUserDetails));
  }

  private extractLocations(userDetails: UserDetails, workers: any): Location[] {
    const id = userDetails.userInfo.id ? userDetails.userInfo.id : userDetails.userInfo.uid;
    let userLocationsByService: LocationsByService[] = [];
    const locations: Location[] = [];
    // in order to extract location from services we must assume there are multiple workers
    if (workers && workers.length > 0 && workers[0].idamId) {
      // caseworkers/admin
      const userSpecificWorkers = workers.filter((cw: Caseworker) => cw.idamId === id);
      userSpecificWorkers.forEach(worker => {
        if (worker && worker.location && worker.location.id) {
          userLocationsByService = addLocationToLocationsByService(userLocationsByService, worker.location, worker.service);
          locations.push(worker.location);
        }
      })
      this.sessionStorageService.setItem('userLocations', JSON.stringify(userLocationsByService));
      return locations;
    } else {
      // judicial workers
      if (workers && workers.length > 0) {
        const judicialWorkers = (workers as CaseRoleDetails[]);
        judicialWorkers.forEach(worker => {
          const jAppts = worker.appointments.filter(appt => appt.location !== 'National' && appt.epimms_id && appt.epimms_id !== '');
          jAppts.forEach(jAppt => {
            const service = getServiceFromServiceCode(jAppt.service_code);
            userLocationsByService = addLocationToLocationsByService(userLocationsByService, jAppt, service);
            locations.push({id: jAppt.epimms_id, locationName: jAppt.location, services: [] });
          })
        })
        this.sessionStorageService.setItem('userLocations', JSON.stringify(userLocationsByService));
        return locations;
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
    });
    const testJurisdictions = ['IA', 'SSCS', 'CIVIL'];
    return this.userRole === UserRole.Judicial ? this.allocateRoleService.getCaseRolesUserDetails([id], testJurisdictions) : this.caseworkerDataService.getCaseworkersForServices(testJurisdictions);
  }

  private getLocations(locations: Location[]): Observable<LocationModel[]> {
    if (!locations || locations.length === 0) {
      return of(null);
    }
    return this.http.post<LocationModel[]>(`api/locations/getLocationsById`, {locations});
  }
}
