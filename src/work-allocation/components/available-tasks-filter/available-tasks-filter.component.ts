import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CheckboxListComponent } from '@hmcts/rpx-xui-common-lib';

import { SessionStorageService } from '../../../app/services';
import { Location } from '../../models/dtos';
import { LocationDataService } from '../../services';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../utils';
import { FilterConstants } from '../constants';

@Component({
  selector: 'exui-available-tasks-filter',
  templateUrl: './available-tasks-filter.component.html',
  styleUrls: ['available-tasks-filter.component.scss']
})
export class AvailableTasksFilterComponent implements OnInit, AfterViewInit {

  @ViewChild(CheckboxListComponent) intialLocationFilter: CheckboxListComponent<Location>;
  @ViewChild('filterDetails')
  public readonly filterDetails: ElementRef<HTMLDetailsElement>;

  public get detailsElement(): HTMLDetailsElement {
    return this.filterDetails ? this.filterDetails.nativeElement : undefined;
  }

  @Input()
  public get selection(): Location[] {
    return this.pSelection;
  }
  public set selection(value: Location[]) {
    if (this.pSelection !== value) {
      this.pSelection = value;
    }
  }
  private pSelection: Location[] = [];

  public locationFilter: CheckboxListComponent<Location>;
  public locations: Location[];
  public preselection: Location[];
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
  constructor(
    private readonly locationService: LocationDataService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly router: Router
  ) {}

  public ngAfterViewInit() {
    this.locationFilter = this.intialLocationFilter;
  }

  public ngOnInit(): void {
    let preselection: Location[] = [ FilterConstants.Defaults.LOCATION ];
    // See if we have anything stored in the session for the filter.
    const stored: string = this.sessionStorageService.getItem(FilterConstants.Session.AvailableTasks);
    if (stored) {
      preselection = [ ...JSON.parse(stored) ];
    }
    this.preselection = preselection;
    // Get the locations for the checkbox filter component.
    this.locationService.getLocations().subscribe(locations => {
      this.locations = [ ...locations ];
    }, error => {
      handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
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
    if (this.locationFilter) {
      this.selection = [ ...this.locationFilter.selection ];
    }
    console.log('selected locations are ', JSON.stringify(this.selection));
    const toStore: string = JSON.stringify(this.selection);
    this.sessionStorageService.setItem(FilterConstants.Session.AvailableTasks, toStore);
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
}
