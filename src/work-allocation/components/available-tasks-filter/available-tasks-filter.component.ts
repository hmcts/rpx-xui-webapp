import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CheckboxListComponent } from '@hmcts/rpx-xui-common-lib';

import { Location } from '../../models/dtos';
import { LocationDataService } from './../../services/location-data.service';

export const AVAILABLE_TASKS_FILTER_ID = 'AVAILABLE_TASKS_FILTER';

@Component({
  selector: 'exui-available-tasks-filter',
  templateUrl: './available-tasks-filter.component.html',
  styleUrls: ['available-tasks-filter.component.scss']
})
export class AvailableTasksFilterComponent implements OnInit {
  @ViewChild(CheckboxListComponent)
  private readonly locationFilter: CheckboxListComponent<Location>;
  private detailsElement: HTMLDetailsElement;

  @Input()
  public get selection(): Location[] {
    return this.pSelection;
  }
  public set selection(value: Location[]) {
    if (this.pSelection !== value) {
      this.pSelection = value;
      this.selectionChanged.emit(this.pSelection);
    }
  }
  private pSelection: Location[] = [];

  public locations: Location[];
  public preselection: Location[];
  private readonly DEFAULT_LOCATION = {
    id: 'a', locationName: 'Taylor House', services: [ 'a' ]
  };
  private handledInitialSelection = false;

  /**
   * Emit an event to notify the parent component that the selected
   * Locations have changed. The new selection is emitted with the event
   * but can also be retrieved from component.selection.
   */
  @Output() public selectionChanged: EventEmitter<Location[]> = new EventEmitter<Location[]>();

  /**
   * Take in the locationService so we can navigate when actions are clicked.
   */
  constructor(private readonly locationService: LocationDataService) {}


  public ngOnInit(): void {
    // See if we have anything stored in the session for the filter.
    const stored: string = sessionStorage.getItem(AVAILABLE_TASKS_FILTER_ID);
    if (stored) {
      this.preselection = [ ...JSON.parse(stored) ];
    } else {
      this.preselection = [ this.DEFAULT_LOCATION ];
    }
    // Get the locations for the checkbox filter component.
    this.locationService.getLocations().subscribe(locations => {
      this.locations = [ ...locations ];
    });
  }

  public onSelectionChange(): void {
    if (!this.handledInitialSelection) {
      this.applyFilter();
      this.handledInitialSelection = true;
    }
  }

  /**
   * Returns a label to represent a location.
   * @param location The Location to render a label for.
   */
  public locationLabelFunction(location: Location): string {
    return location ? location.locationName : '';
  }

  /**
   * Apply the filter and load the new set of tasks.
   * Also save the applied filter to the session storage.
   */
  public applyFilter(): void {
    this.selection = [ ...this.locationFilter.selection ];
    const toStore: string = JSON.stringify(this.selection);
    sessionStorage.setItem(AVAILABLE_TASKS_FILTER_ID, toStore);
    this.selectionChanged.emit(this.selection);
  }

  /**
   * Reset the filter to its last applied state and collapse the
   * <details></details> panel.
   */
  public cancelFilter(): void {
    this.locationFilter.selection = this.selection;
    if (this.detailsElement) {
      this.detailsElement.open = false;
    }
  }

  /**
   * Listen for the <details></details> element being toggled so that
   * we can get a reference to it and then collapse it again if the
   * user cancels the filtering activity.
   */
  public onDetailsToggle(event: { target: HTMLDetailsElement }): void {
    if (!this.detailsElement) {
      this.detailsElement = event.target;
    }
  }
}
