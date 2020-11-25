import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Caseworker, Location } from './../../models/dtos/task';
import { CaseworkerDataService } from './../../services/case-worker-data.service';
import { LocationDataService } from './../../services/location-data.service';

@Component({
  selector: 'exui-task-assignment',
  templateUrl: './task-assignment.component.html',
  styleUrls: ['task-assignment.component.scss']
})
export class TaskAssignmentComponent {

  @Input() public excludeCaseworkers: Caseworker[];

  /**
   * Emit an event to notify the parent component that the selected
   * Caseworker has changed. The new selection is emitted with the event
   * but can also be retrieved from component.caseworker.
   */
  @Output() public caseworkerChanged: EventEmitter<Caseworker> = new EventEmitter<Caseworker>();

  public readonly ALL_LOCATIONS: Location = {
    id: '**ALL_LOCATIONS**',
    locationName: 'All',
    services: []
  };

  @Input()
  public get location(): Location {
    return this.pLocation;
  }
  public set location(value: Location) {
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

  constructor(
    private readonly locationService: LocationDataService,
    private readonly caseworkerService: CaseworkerDataService
  ) {
    // Get the locations for this component.
    this.locationService.getLocations().subscribe(locations => {
      this.pLocations = [ ...locations ];
    });
  }

  /**
   * Indicates whether a caseworker is able to be selected. This takes into
   * account the optional excludeCaseworkers array and will return false only
   * when the caseworker parameter is in that array.
   * @param caseworker The caseworker to consider.
   */
  public caseworkerIsSelectable(caseworker: Caseworker): boolean {
    if (this.excludeCaseworkers) {
      return this.excludeCaseworkers.includes(caseworker) === false;
    }
    return true;
  }

  // Handles a change to the location.
  private handleLocationChanged(): void {
    // When the location is changed, remove the caseworker selection.
    this.caseworker = null;

    // If we have no location selected, clear out the selectable caseworkers.
    // And jump out early.
    if (!this.location) {
      this.pCaseworkers = [];
      return;
    }

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

  // Sets up the caseworkers, ensuring that excluded ones are filtered out.
  private setupCaseworkers(caseworkers: Caseworker[]): void {
    this.pCaseworkers = [ ...caseworkers ].filter(item => {
      return this.caseworkerIsSelectable(item);
    });
  }

}
