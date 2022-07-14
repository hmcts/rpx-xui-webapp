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
import { Booking } from '../../booking/models';
import { BookingService } from '../../booking/services';
import { CaseRoleDetails } from '../../role-access/models/case-role-details.interface';
import { AllocateRoleService } from '../../role-access/services';
import { ServiceRefData } from '../models/common';
import { Caseworker, Location, LocationsByService } from '../models/dtos';
import { CaseworkerDataService } from '../services';
import { ServiceRefDataService } from '../services/service-ref-data.service';
import { addLocationToLocationsByService, addLocationToLocationsByServiceCode, getServiceFromServiceCode, handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../utils';

@Injectable({
  providedIn: 'root'
})
// Note: used before my work and booking screen
export class LocationResolver implements Resolve<LocationModel[]> {

  private userRole: string;
  private bookableServices = new Set<string>();
  private userId: string;
  private serviceRefData: ServiceRefData[];

  constructor(
    private readonly store: Store<fromCaseList.State>,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly caseworkerDataService: CaseworkerDataService,
    private readonly allocateRoleService: AllocateRoleService,
    private readonly bookingService: BookingService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly serviceRefDataService: ServiceRefDataService
  ) {
  }

  public resolve(): Observable<LocationModel[]> {
    return this.userDetails()
      .pipe(
        first(),
        mergeMap((userDetails: UserDetails) => this.serviceRefDataService.getServiceRefData()
          .pipe(
            map((serviceRefData) => this.saveServiceRefData(serviceRefData, userDetails))
          )
        ),
        mergeMap((userDetails: UserDetails) => this.getJudicialWorkersOrCaseWorkers(userDetails)
          .pipe(
            map((caseWorkers) => this.extractLocations(caseWorkers)),
          )
        ),
        mergeMap((locations: Location[]) => this.bookingService.getBookings(this.userId)
          .pipe(
            map((bookings: Booking[]) => this.addBookingLocations(locations, bookings)),
          )
        ),
        mergeMap((locations: Location[]) => this.getLocations(locations)),
        catchError(error => {
          handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
          return EMPTY;
        })
      );
  }

  private userDetails(): Observable<UserDetails> {
    return this.store.pipe(select(fromRoot.getUserDetails));
  }

  private extractLocations(workers: any): Location[] {
    let userLocationsByService: LocationsByService[] = [];
    const locations: Location[] = [];
    const locationServices = new Set<string>();
    // in order to extract location from services we must assume there are multiple workers
    if (workers && workers.length > 0 && workers[0].idamId) {
      // caseworkers/admin
      const userSpecificWorkers = workers.filter((cw: Caseworker) => cw.idamId === this.userId);
      userSpecificWorkers.forEach(worker => {
        if (worker && worker.location && worker.location.id) {
          locationServices.add(worker.service);
          userLocationsByService = this.bookableServices.has(worker.service) ? addLocationToLocationsByService(userLocationsByService, worker.location, worker.service, true) : addLocationToLocationsByService(userLocationsByService, worker.location, worker.service);
          locations.push(worker.location);
        }
      })
    } else {
      // judicial workers
      if (workers && workers.length > 0) {
        const judicialWorkers = (workers as CaseRoleDetails[]);
        judicialWorkers.forEach(worker => {
          const jAppts = worker.appointments.filter(appt => appt.location !== 'National' && appt.epimms_id && appt.epimms_id !== '');
          jAppts.forEach(jAppt => {
            const service = getServiceFromServiceCode(jAppt.service_code, this.serviceRefData);
            locationServices.add(service);
            const judicialLocation = {id: jAppt.epimms_id, locationName: jAppt.location, services: [] };
            userLocationsByService = this.bookableServices.has(service) ? addLocationToLocationsByService(userLocationsByService, judicialLocation, service, true) : addLocationToLocationsByService(userLocationsByService, judicialLocation, service);
            locations.push(judicialLocation);
          })
        })
      }
    }
    // in the scenario where there are no base locations but is bookable, need to add in booking reference
    this.bookableServices.forEach(bookableService => {
      if (!locationServices.has(bookableService)) {
        const newBookableService: LocationsByService = {service: bookableService, locations: [], bookable: true};
        userLocationsByService.push(newBookableService);
      }
    })
    this.sessionStorageService.setItem('userLocations', JSON.stringify(userLocationsByService));
    return locations;
  }

  private getJudicialWorkersOrCaseWorkers(userDetails: UserDetails): Observable<any[]> {
    this.userId = userDetails.userInfo.id ? userDetails.userInfo.id : userDetails.userInfo.uid;
    this.userRole = AppUtils.isLegalOpsOrJudicial(userDetails.userInfo.roles);
    const jurisdictions: string[] = [];
    userDetails.roleAssignmentInfo.forEach(roleAssignment => {
      const roleJurisdiction = roleAssignment.jurisdiction;
      if (roleJurisdiction && !jurisdictions.includes(roleJurisdiction) && roleAssignment.roleType === 'ORGANISATION') {
        jurisdictions.push(roleJurisdiction);
      }
      if (roleJurisdiction && !this.bookableServices.has(roleJurisdiction) && roleAssignment.roleType === 'ORGANISATION'
        && roleAssignment.bookable === true
        ) {
        this.bookableServices.add(roleJurisdiction);
      }
    });
    this.sessionStorageService.setItem('bookableServices', JSON.stringify(Array.from(this.bookableServices)));
    return this.userRole === UserRole.Judicial ? this.allocateRoleService.getCaseRolesUserDetails([this.userId], jurisdictions) : this.caseworkerDataService.getCaseworkersForServices(jurisdictions);
  }

  private addBookingLocations(locations: Location[], bookings: Booking[]): Location[] {
    // Since bookings are given without service data we just need record of locations to match against
    const bookingLocations = new Set<string>();
    bookings.filter(booking => {
      // if this is an active booking
      if ((booking.beginTime && new Date(booking.beginTime) <= new Date()) && (!booking.endTime || new Date(booking.endTime) >= new Date())) {
        bookingLocations.add(booking.locationId);
      }
    })
    this.sessionStorageService.setItem('bookingLocations', JSON.stringify(Array.from(bookingLocations)));
    // Note: currently we do not immediately show booking locations - the only way to automatically show booking locations currently
    // is to navigate via the booking screens. We can add them (if necessary in this)
    return locations;
  }

  private saveServiceRefData(serviceRefData: any, userDetails: UserDetails): UserDetails {
    this.serviceRefData = serviceRefData;
    return userDetails;
  }

  private getLocations(locations: Location[]): Observable<LocationModel[]> {
    if (!locations || locations.length === 0) {
      return of(null);
    }
    return this.http.post<LocationModel[]>(`api/locations/getLocationsById`, {locations});
  }
}
