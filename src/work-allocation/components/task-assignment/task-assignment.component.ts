import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Caseworker, Location } from '../../models/dtos';
import { CaseworkerDataService, LocationDataService } from '../../services';
import { FilterConstants } from '../constants';

@Component({
  selector: 'exui-task-assignment',
  templateUrl: './task-assignment.component.html'
})
export class TaskAssignmentComponent implements OnInit {

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
    value = value || this.ALL_LOCATIONS; // undefined or null means "All"
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

  private pLocation: Location = this.ALL_LOCATIONS;
  private pLocations: Location[];
  private pCaseworker: Caseworker = null;
  private pCaseworkers: Caseworker[];
  private pAllCaseworkers: Caseworker[]; // Holds the unfiltered list for the location.
  private pExcludeCaseworkers: Caseworker[];

  constructor(
    private readonly locationService: LocationDataService,
    private readonly caseworkerService: CaseworkerDataService
  ) {
  }

  public ngOnInit(): void {
    // Get the locations for this component.
    this.locationService.getLocations().subscribe(locations => {
      this.pLocations = [ ...locations ];
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
      return !this.excludeCaseworkers.includes(caseworker);
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
      });
    } else {
      // Otherwise, get the caseworkers at the specifed location.
      this.caseworkerService.getForLocation(this.location.id).subscribe(caseworkers => {
        this.setupCaseworkers(caseworkers);
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

}
