import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { SessionStorageService } from '../../../app/services';
import { Location } from '../../models/dtos';
import { FilterConstants } from '../constants';

@Component({
  selector: 'exui-case-manager-filter',
  templateUrl: './case-manager-filter.component.html',
  styleUrls: ['./case-manager-filter.component.scss']
})
export class CaseManagerFilterComponent implements OnChanges {
  // Protected instances of the exported constants.
  public readonly ALL_LOCATIONS: Location = FilterConstants.Options.Locations.ALL;

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

  @Input()
  public get jurisdiction(): any {
    return this.pJurisdiction;
  }

  public set jurisdiction(value: any) {
    if (this.pJurisdiction !== value) {
      this.pJurisdiction = value;
      this.saveFilterToSession();
      this.emitChangedEvent();
    }
  }

  private pLocation: Location = this.ALL_LOCATIONS;
  private pJurisdiction: any =  {id: 'IA', name: 'Immigration and Asylum'};

  /**
   * Emit an event to notify the parent component that the selected Caseworker
   * and/or Location has changed. The new selection is emitted with the event
   * but can also be retrieved from component.location.
   */
  @Output() public selectionChanged: EventEmitter<{ location: Location, jurisdiction: any}>
    = new EventEmitter<{ location: Location, jurisdiction: any }>();

  /**
   * Accept the SessionStorageService for adding to and retrieving from sessionStorage.
   */
  constructor(private readonly sessionStorageService: SessionStorageService) {
  }

  public ngOnChanges(): void {
    if (this.locations) {
      // See if we have anything stored in the session for the filter.
      const stored: string = this.sessionStorageService.getItem(FilterConstants.Session.TaskManager);
      if (stored) {
        const { caseworkerId, locationId } = JSON.parse(stored);
        this.pLocation = this.getLocationById(locationId);
      }
      this.emitChangedEvent();
    }
  }

  private saveFilterToSession(): void {
    const toStore = JSON.stringify({
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

  private emitChangedEvent(): void {
    this.selectionChanged.emit({
      location: this.location,
      jurisdiction: this.jurisdiction,
    });
  }
}
