import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import c = require('config');

import { Caseworker, Location } from '../../models/dtos';
import { CaseworkerDisplayName } from '../../pipes';
import { CaseworkerDataService, LocationDataService } from '../../services';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../utils';
import { FilterConstants } from '../constants';
import { SessionStorageService } from '../../../app/services';
import { UserInfo } from '../../../app/models/user-details.model';

@Component({
  selector: 'exui-task-assignment',
  templateUrl: './task-assignment.component.html'
})
export class TaskAssignmentComponent implements OnInit {

  @Input() public showProblem: boolean;

  @Input()
  public get excludeCaseworkers(): Caseworker[] {
    return this.pExcludeCaseworkers;
  }
  public set excludeCaseworkers(value: Caseworker[]) {
    if (this.pExcludeCaseworkers !== value) {
      this.pExcludeCaseworkers = value;
      if (this.pAllCaseworkers && this.pAllCaseworkers.length > 0) {
        this.setupCaseworkers(this.pAllCaseworkers);
      }
    }
  }

  /**
   * Emit an event to notify the parent component that the selected
   * Caseworker has changed. The new selection is emitted with the event
   * but can also be retrieved from component.caseworker.
   */
  @Output() public caseworkerChanged: EventEmitter<Caseworker> = new EventEmitter<Caseworker>();

  public readonly ALL_LOCATIONS: Location = FilterConstants.Options.Locations.ALL;

  @Input()
  public get location(): Location {
    return this.pLocation;
  }
  public set location(value: Location) {
    value = value || this.ALL_LOCATIONS;
    if (this.pLocation !== value) {
      this.pLocation = value;
      this.handleLocationChanged();
    }
  }

  public get caseworker(): Caseworker {
    return this.pCaseworker;
  }
  public set caseworker(value: Caseworker) {
    if (this.pCaseworker !== value) {
      this.pCaseworker = value;
      this.caseworkerChanged.emit(this.pCaseworker);
    }
  }

  /**
   * The locations that are available to be selected from.
   */
  public get locations(): Location[] {
    return this.pLocations;
  }

  /**
   * The caseworkers that are available to be selected from.
   * Note that this selection depends on the currently
   * selected location.
   */
  public get caseworkers(): Caseworker[] {
    return this.pCaseworkers;
  }

  /**
   * Gets the private logged in user id
   */
  public get userId(): string {
    return this.pUserId;
  }

  /**
   * Gets the caseworker's location
   */
  public get caseworkerLocation(): Location {
    return this.pCaseworkerLocation;
  }

  private pLocation: Location = null;
  private pLocations: Location[];
  private pCaseworker: Caseworker = null;
  private pCaseworkers: Caseworker[];
  private pAllCaseworkers: Caseworker[]; // Holds the unfiltered list for the location.
  private pExcludeCaseworkers: Caseworker[];
  private pUserId: string;
  // pCaseworkerLocation is the caseworker that sets the location of the location dropdown
  // Note: Setter for caseworkerLocation may come in useful if the selected location needs to be set via the caseworker assigned to the task
  private pCaseworkerLocation: Location;
  private readonly caseworkerDisplayName: CaseworkerDisplayName = new CaseworkerDisplayName();

  constructor(
    private readonly router: Router,
    private readonly locationService: LocationDataService,
    private readonly caseworkerService: CaseworkerDataService,
    private readonly sessionStorageService: SessionStorageService
  ) {
  }

  public ngOnInit(): void {

    // set the user details in order to get initially selected location
    this.setupUserId();
    this.setupCaseworkerLocation();


    // Get the locations for this component.
    this.locationService.getLocations().subscribe(locations => {
      this.pLocations = [...locations];
      this.setupSelectedLocation();
      this.location = this.vetLocation(this.location);
    }, error => {
      handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
    });

    // Also get the caseworkers at the initial location (which may be "All").
    this.handleLocationChanged();
  }

 /**
  * Sets up the logged in userId
  */
  private setupUserId(): void {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      this.pUserId = userInfo.id ? userInfo.id : userInfo.uid;
    }
  }

  /**
   * Using set user id, gets caseworker details for the caseworker which will set the selected location
   * (caseworker for the purpose of selecting location in dropdown currently the logged in user)
   */
  private setupCaseworkerLocation(): void {
    this.caseworkerService.getAll().subscribe(caseworkers => {
      const assignedCaseworker = caseworkers.find(cw => this.isLoggedInUser(cw.idamId));
      this.pCaseworkerLocation = assignedCaseworker.location ? assignedCaseworker.location : null;
    }, error => {
      handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
    });
  }

  /**
   * Checks if the current caseworker matches the caseworker that will set the location (logged in user)
   */
  private isLoggedInUser(idamId: string): boolean {
    return idamId === this.pUserId;
  }

  /**
   * Indicates whether a caseworker is able to be selected. This takes into
   * account the optional excludeCaseworkers array and will return false only
   * when the caseworker parameter is in that array.
   * @param caseworker The caseworker to consider.
   */
  public caseworkerIsSelectable(caseworker: Caseworker): boolean {
    if (this.excludeCaseworkers) {
      // This check may well change once we integrate with the API but
      // it's unlikely to be an object reference check in any case.
      const shortName = this.caseworkerDisplayName.transform(caseworker, false);
      return !this.excludeCaseworkers.find(ex => {
        return this.caseworkerDisplayName.transform(ex, false) === shortName;
      });
    }
    return true;
  }

  /**
   * Handles a change to the location
   */
  private handleLocationChanged(): void {
    // When the location is changed, remove the caseworker selection.
    this.caseworker = null;
    // If "All" is selected as the location, we need all caseworkers at all locations.
    if (this.location === this.ALL_LOCATIONS) {
      this.caseworkerService.getAll().subscribe(caseworkers => {
        this.setupCaseworkers(caseworkers);
      }, error => {
        handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
      });
    } else if (this.location && this.location.id) {
      // Otherwise, get the caseworkers at the specifed location.
      this.caseworkerService.getAll().subscribe(caseworkers => {
        const locationCaseWorkers = caseworkers.filter(cw => this.locationMatchesSelectedLocation(cw));
        this.setupCaseworkers(locationCaseWorkers);
      }, error => {
        handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
      });
    }
  }

  /**
   * Checks whether the caseworker's location matches the location selected in the dropdown
   * @param cw The caseworker to consider.
   */
  private locationMatchesSelectedLocation(cw: Caseworker): boolean {
    return cw.location ? cw.location.id.toString() === this.location.id : false;
  }

  /**
   * Sets up the caseworkers, ensuring that excluded ones that are filtered out.
   * @param caseworkers The initial list of caseworkers
   */
  private setupCaseworkers(caseworkers: Caseworker[]): void {
    this.pAllCaseworkers = [...caseworkers];
    this.pCaseworkers = this.pAllCaseworkers.filter(item => {
      return this.caseworkerIsSelectable(item);
    });
  }

  public vetLocation(toVet: Location): Location {
    if (toVet && this.locations) {
      const vetted = this.locations.find(loc => loc.locationName === toVet.locationName);
      return vetted || this.ALL_LOCATIONS;
    }
    return toVet;
  }

  /**
   * Sets up the selected location in the dropdown via caseworker for location
   */
  private setupSelectedLocation(): void {
    if (this.caseworkerLocation) {
      this.location = this.locations.find(loc => loc.id === this.caseworkerLocation.id);
    }
  }

}
