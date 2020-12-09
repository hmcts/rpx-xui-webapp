import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs';

import * as dtos from '../../models/dtos';
import { LocationDataService } from '../../services';
import { getMockLocations } from '../../tests/utils.spec';
import { AVAILABLE_TASKS_FILTER_ID, AvailableTasksFilterComponent } from './available-tasks-filter.component';

@Component({
  template: `<exui-available-tasks-filter (selectionChanged)="onSelectionChanged($event)"></exui-available-tasks-filter>`
})
class WrapperComponent {
  @ViewChild(AvailableTasksFilterComponent) public appComponentRef: AvailableTasksFilterComponent;
  public changedEvents: any[] = [];
  public onSelectionChanged(locations: Location[]): void {
    this.changedEvents.push(locations);
  }
}

describe('AvailableTasksFilterComponent', () => {
  let component: AvailableTasksFilterComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  const mockLocationService = jasmine.createSpyObj('mockLocationService', ['getLocations']);
  const mockLocations: dtos.Location[] = getMockLocations();
  const mockSavedFilter = JSON.stringify([ mockLocations[0] ]);
  const mocksessionStore = {
    [AVAILABLE_TASKS_FILTER_ID]: mockSavedFilter
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ExuiCommonLibModule
      ],
      declarations: [ AvailableTasksFilterComponent, WrapperComponent ],
      providers: [
        { provide: LocationDataService, useValue: mockLocationService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    mockLocationService.getLocations.and.returnValue(of(mockLocations));
    spyOn(sessionStorage, 'getItem').and.callFake((key) => {
      return mocksessionStore[key];
    });
    spyOn(sessionStorage, 'setItem').and.callFake((key, value) => {
      return mocksessionStore[key] = value;
    });
    fixture.detectChanges();
  });

  it('should attempt to load a saved filter from session storage on load', () => {
    expect(sessionStorage.getItem).toHaveBeenCalledWith(AVAILABLE_TASKS_FILTER_ID);
    expect(component.preselection).toBeDefined();
    expect(component.preselection.length).toEqual(1);
    expect(component.preselection[0].locationName).toEqual(mockLocations[0].locationName);
  });

  it('should have loaded the mock locations', () => {
    expect(mockLocationService.getLocations).toHaveBeenCalled();
    expect(component.locations).toBeDefined();
    expect(component.locations.length).toEqual(mockLocations.length);
  });

  it('should have dispatched an event to right away as we have a preselection', () => {
    const length = wrapper.changedEvents.length;
    expect(length).toBeGreaterThan(0);
    expect(wrapper.changedEvents[length - 1].length).toEqual(1);
    expect(wrapper.changedEvents[length - 1][0].locationName).toEqual(mockLocations[0].locationName);
  });

  it('should NOT dispatch a change event when a checkbox is clicked', () => {
    const element = fixture.debugElement.nativeElement;

    // Record how many change events we've had so far.
    const eventsBeforeSelectAll = wrapper.changedEvents.length;

    // Click on the summary.
    const summary = element.querySelector('#toggleFilter');
    summary.dispatchEvent(new Event('click'));

    // Now click on the "Select all" option.
    const selectAll = element.querySelector('#select_all');
    selectAll.dispatchEvent(new Event('change'));

    // Ensure we haven't had another change event fire.
    expect(wrapper.changedEvents.length).toEqual(eventsBeforeSelectAll);
  });

  it('should reset the checkboxes when cancel is clicked', () => {
    const element = fixture.debugElement.nativeElement;

    // Get the selection to start off with.
    const startingSelection = [ ...component.locationFilter.selection ];

    // Click on the summary.
    const summary = element.querySelector('#toggleFilter');
    summary.dispatchEvent(new Event('click'));

    // Now click on the "Select all" option.
    const selectAll = element.querySelector('#select_all');
    selectAll.dispatchEvent(new Event('change'));

    // We should now have a changed selection.
    const selectionAfterSelectAll = [ ...component.locationFilter.selection ];
    expect(selectionAfterSelectAll.length).not.toEqual(startingSelection.length);

    const cancel = element.querySelector('#cancelFilter');
    cancel.dispatchEvent(new Event('click'));

    // And it should now be changed back to what it was before.
    const selectionAfterCancel = [ ...component.locationFilter.selection ];
    expect(selectionAfterCancel.length).toEqual(startingSelection.length);
    expect(selectionAfterCancel[0].locationName).toEqual(startingSelection[0].locationName);
  });

  it('should ONLY dispatch a change event when apply button is clicked', () => {
    const element = fixture.debugElement.nativeElement;

    // Record how many change events we've had so far.
    const eventsBeforeApply = wrapper.changedEvents.length;

    // Click on the summary.
    const summary = element.querySelector('#toggleFilter');
    summary.dispatchEvent(new Event('click'));

    // Now click on the "Select all" option.
    const selectAll = element.querySelector('#select_all');
    selectAll.dispatchEvent(new Event('change'));

    // And NOW click on "Apply".
    const apply = element.querySelector('#applyFilter');
    apply.dispatchEvent(new Event('click'));

    // We should have received another change event.
    expect(wrapper.changedEvents.length).toBeGreaterThan(eventsBeforeApply);

    // And also make sure we had an attempt to save the filter.
    const toStore = JSON.stringify(component.selection);
    expect(sessionStorage.setItem).toHaveBeenCalledWith(AVAILABLE_TASKS_FILTER_ID, toStore);
  });
});
