import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Caseworker, Location } from '../../models/dtos';

export const ALL_LOCATIONS: Location = {
  id: '**ALL_LOCATIONS**',
  locationName: 'All locations',
  services: []
};
export const ALL_CASEWORKERS: Caseworker = {
  idamId: '**ALL_CASEWORKERS**',
  firstName: 'All',
  lastName: 'Caseworkers',
  location: ALL_LOCATIONS
};
export const NO_CASEWORKER_ASSIGNED: Caseworker = {
  idamId: '**NO_CASEWORKER_ASSIGNED**',
  firstName: 'None',
  lastName: '(unassigned tasks)',
  location: ALL_LOCATIONS
};

@Component({
  selector: 'exui-task-manager-filter',
  templateUrl: './task-manager-filter.component.html'
})
export class TaskManagerFilterComponent {
  // Protected instances of the exported constants.
  protected readonly ALL_LOCATIONS: Location = ALL_LOCATIONS;
  protected readonly ALL_CASEWORKERS: Caseworker = ALL_CASEWORKERS;
  protected readonly NO_CASEWORKER_ASSIGNED: Caseworker = NO_CASEWORKER_ASSIGNED;

  /**
   * The caseworkers that are available to be selected from.
   */
  @Input() public caseworkers: Caseworker[];

  /**
   * The locations that are available to be selected from.
   */
  @Input() public locations: Location[];

  @Input()
  public get location(): Location {
    return this.pLocation;
  }
  public set location(value: Location) {
    value = value || this.ALL_LOCATIONS; // undefined or null means "All"
    if (this.pLocation !== value) {
      this.pLocation = value;
      this.locationChanged.emit(this.pLocation);
    }
  }
  private pLocation: Location = this.ALL_LOCATIONS;

  @Input()
  public get caseworker(): Caseworker {
    return this.pCaseworker;
  }
  public set caseworker(value: Caseworker) {
    value = value || this.ALL_CASEWORKERS; // undefined or null means "All"
    if (this.pCaseworker !== value) {
      this.pCaseworker = value;
      this.caseworkerChanged.emit(this.pCaseworker);
    }
  }
  private pCaseworker: Caseworker = this.ALL_CASEWORKERS;

  /**
   * Emit an event to notify the parent component that the selected
   * Caseworker has changed. The new selection is emitted with the event
   * but can also be retrieved from component.caseworker.
   */
  @Output() public caseworkerChanged: EventEmitter<Caseworker> = new EventEmitter<Caseworker>();

  /**
   * Emit an event to notify the parent component that the selected
   * Location has changed. The new selection is emitted with the event
   * but can also be retrieved from component.location.
   */
  @Output() public locationChanged: EventEmitter<Location> = new EventEmitter<Location>();
}
