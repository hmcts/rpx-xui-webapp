import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
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
import { ServiceRefData } from '../models/common';
import { Location, LocationsByService } from '../models/dtos';
import { ServiceRefDataService } from '../services/service-ref-data.service';
import { addLocationToLocationsByService, handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../utils';

@Injectable({
  providedIn: 'root'
})
// Note: used before my work and booking screens
export class LocationResolver implements Resolve<LocationModel[]> {

  private userRole: string;
  private readonly bookableServices: string[] = [];
  private userId: string;
  private serviceRefData: ServiceRefData[];

  constructor(
    private readonly store: Store<fromCaseList.State>,
    private readonly router: Router,
    private readonly http: HttpClient,
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
            map((serviceRefData) => this.getJudicialWorkersOrCaseWorkers(serviceRefData, userDetails))
          )
        ),
        mergeMap((locations: Location[]) => this.userRole.toLocaleLowerCase() === UserRole.Judicial && this.bookableServices.length > 0 ? this.bookingService.getBookings(this.userId, this.bookableServices) : of([])
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

  public getJudicialWorkersOrCaseWorkers(serviceRefData, userDetails: UserDetails): Location[] {
    this.serviceRefData = serviceRefData;
    this.userId = userDetails.userInfo.id ? userDetails.userInfo.id : userDetails.userInfo.uid;
    this.userRole = AppUtils.isBookableAndJudicialRole(userDetails) ? UserRole.Judicial : AppUtils.isLegalOpsOrJudicial(userDetails.userInfo.roles);
    let userLocationsByService: LocationsByService[] = [];
    const locations: Location[] = [];
    const locationServices = new Set<string>();
    userDetails.roleAssignmentInfo.forEach(roleAssignment => {
      const roleJurisdiction = roleAssignment.jurisdiction;
      if (roleJurisdiction && !this.bookableServices.includes(roleJurisdiction) && roleAssignment.roleType === 'ORGANISATION'
        && (roleAssignment.bookable === true || roleAssignment.bookable === 'true')
      ) {
        this.bookableServices.push(roleJurisdiction);
      }
      if (roleJurisdiction && roleAssignment.roleType === 'ORGANISATION'
        && roleAssignment.baseLocation && roleAssignment.substantive.toLocaleLowerCase() === 'y') {
        if (!locations.find((location) => location.id === roleAssignment.baseLocation && location.services.includes(roleJurisdiction))) {
          const location = { id: roleAssignment.baseLocation, userId: this.userId, locationId: roleAssignment.baseLocation, locationName: '', services: [roleAssignment.jurisdiction] };
          locations.push(location);
          locationServices.add(roleAssignment.jurisdiction);
        }
      }
    });
    locations.forEach(location => {
      location.services.map((service) => {
        userLocationsByService = this.bookableServices.includes(service) ? addLocationToLocationsByService(userLocationsByService, location, service, true) : addLocationToLocationsByService(userLocationsByService, location, service);
      });
    });
    this.bookableServices.forEach(bookableService => {
      if (!locationServices.has(bookableService)) {
        const newBookableService: LocationsByService = { service: bookableService, locations: [], bookable: true };
        userLocationsByService.push(newBookableService);
      }
    });
    this.sessionStorageService.setItem('userLocations', JSON.stringify(userLocationsByService));
    this.sessionStorageService.setItem('bookableServices', JSON.stringify(this.bookableServices));
    return locations;
  }

  private addBookingLocations(locations: Location[], bookings: Booking[]): Location[] {
    // TODO: Check if user still has valid bookable role assignment for service
    const bookingLocations: string[] = [];
    bookings.filter(booking => {
      // if this is an active booking
      if (moment(new Date()).isSameOrAfter(booking.beginTime) && moment(new Date()).isSameOrBefore(booking.endTime)) {
        bookingLocations.push(booking.locationId);
      }
    });
    this.saveBookingLocation(bookingLocations);
    return locations;
  }

  private saveBookingLocation(newBookingLocations: string[]) {
    // Since bookings are given without service data we just need record of locations to match against
    const stored: string = this.sessionStorageService.getItem('bookingLocations');
    let bookingLocations = new Set<string>();
    if (stored) {
      bookingLocations = new Set(JSON.parse(stored));
    }
    newBookingLocations.forEach(location => {
      bookingLocations.add(location);
    });

    // Note: currently we do not immediately show booking locations - the only way to automatically show booking locations currently
    // is to navigate via the booking screens. We can add them (if necessary in this)
    this.sessionStorageService.setItem('bookingLocations', JSON.stringify(Array.from(bookingLocations)));
  }

  private getLocations(locations: Location[]): Observable<LocationModel[]> {
    if (!locations || locations.length === 0) {
      return of(null);
    }
    return this.http.post<LocationModel[]>(`api/locations/getLocationsById`, { locations });
  }
}
