import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Caseworker, Location } from '../../models/dtos';
import { CaseworkerDisplayName } from '../../pipes';
import { CaseworkerDataService, LocationDataService } from '../../services';
import { handleFatalErrors } from '../../utils';
import { FilterConstants } from '../constants';

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

  private pLocation: Location = null;
  private pLocations: Location[];
  private pCaseworker: Caseworker = null;
  private pCaseworkers: Caseworker[];
  private pAllCaseworkers: Caseworker[]; // Holds the unfiltered list for the location.
  private pExcludeCaseworkers: Caseworker[];
  private readonly caseworkerDisplayName: CaseworkerDisplayName = new CaseworkerDisplayName();

  constructor(
    private readonly router: Router,
    private readonly locationService: LocationDataService,
    private readonly caseworkerService: CaseworkerDataService
  ) {
  }

  public ngOnInit(): void {
    // Get the locations for this component.
    this.locationService.getLocations().subscribe(locations => {
      this.pLocations = [ ...locations ];
      this.location = this.vetLocation(this.location);
    }, error => {
      handleFatalErrors(error.status, this.router);
    });

    // Also get the caseworkers at the initial location (which may be "All").
    this.handleLocationChanged();
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

  // Handles a change to the location.
  private handleLocationChanged(): void {
    // When the location is changed, remove the caseworker selection.
    this.caseworker = null;

    // If "All" is selected as the location, we need all caseworkers at all locations.
    if (this.location === this.ALL_LOCATIONS) {
      this.caseworkerService.getAll().subscribe(caseworkers => {
        this.setupCaseworkers(caseworkers);
      }, error => {
        handleFatalErrors(error.status, this.router);
      });
    } else if (this.location && this.location.id) {
      // Otherwise, get the caseworkers at the specifed location.
      this.caseworkerService.getForLocation(this.location.id).subscribe(caseworkers => {
        this.setupCaseworkers(caseworkers);
      }, error => {
        handleFatalErrors(error.status, this.router);
      });
    }
  }

  // Sets up the caseworkers, ensuring that excluded ones that are filtered out.
  private setupCaseworkers(caseworkers: Caseworker[]): void {
    this.pAllCaseworkers = [ ...caseworkers ];
    this.pCaseworkers = [ ...caseworkers ].filter(item => {
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

}
