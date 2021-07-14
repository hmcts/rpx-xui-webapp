import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { SessionStorageService } from '../../../app/services';
import { Caseworker, Location } from '../../models/dtos';
import { FilterConstants } from '../constants';

@Component({
  selector: 'exui-task-manager-filter',
  templateUrl: './task-manager-filter.component.html',
  styleUrls: ['./task-manager-filter.component.scss']
})
export class TaskManagerFilterComponent implements OnChanges {
  // Protected instances of the exported constants.
  public readonly ALL_LOCATIONS: Location = FilterConstants.Options.Locations.ALL;
  public readonly ALL_CASEWORKERS: Caseworker = FilterConstants.Options.Caseworkers.ALL;
  public readonly NO_CASEWORKER_ASSIGNED: Caseworker = FilterConstants.Options.Caseworkers.UNASSIGNED;

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
      this.saveFilterToSession();
      this.emitChangedEvent();
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
      this.saveFilterToSession();
      this.emitChangedEvent();
    }
  }
  private pCaseworker: Caseworker = this.ALL_CASEWORKERS;

  /**
   * Emit an event to notify the parent component that the selected Caseworker
   * and/or Location has changed. The new selection is emitted with the event
   * but can also be retrieved from component.location.
   */
  @Output() public selectionChanged: EventEmitter<{ location: Location, caseworker: Caseworker }>
    = new EventEmitter<{ location: Location, caseworker: Caseworker }>();

  /**
   * Accept the SessionStorageService for adding to and retrieving from sessionStorage.
   */
  constructor(private readonly sessionStorageService: SessionStorageService) {
  }

  public ngOnChanges(): void {
    if (this.caseworkers && this.locations) {
      // See if we have anything stored in the session for the filter.
      const stored: string = this.sessionStorageService.getItem(FilterConstants.Session.TaskManager);
      if (stored) {
        const { caseworkerId, locationId } = JSON.parse(stored);
        this.pCaseworker = this.getCaseworkerByIdamId(caseworkerId);
        this.pLocation = this.getLocationById(locationId);
      }
      this.emitChangedEvent();
    }
  }

  private saveFilterToSession(): void {
    const toStore = JSON.stringify({
      caseworkerId: this.caseworker.idamId,
      locationId: this.location.id
    });
    this.sessionStorageService.setItem(FilterConstants.Session.TaskManager, toStore);
  }

  public getLocationById(id: string): Location {
    if (id === this.ALL_LOCATIONS.id) {
      return this.ALL_LOCATIONS;
    }
    return this.locations.find(loc => loc.id === id) || this.ALL_LOCATIONS;
  }

  public getCaseworkerByIdamId(id: string): Caseworker {
    if (id === this.ALL_CASEWORKERS.idamId) {
      return this.ALL_CASEWORKERS;
    } else if (id === this.NO_CASEWORKER_ASSIGNED.idamId) {
      return this.NO_CASEWORKER_ASSIGNED;
    }
    return this.caseworkers.find(cw => cw.idamId === id) || this.ALL_CASEWORKERS;
  }

  private emitChangedEvent(): void {
    this.selectionChanged.emit({
      caseworker: this.caseworker,
      location: this.location
    });
  }
}
