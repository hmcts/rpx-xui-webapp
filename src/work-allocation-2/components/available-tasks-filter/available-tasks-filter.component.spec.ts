import { Location } from '@angular/common';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CheckboxListComponent } from '@hmcts/rpx-xui-common-lib';
import { of, throwError } from 'rxjs';
import { FilterConstants } from '../../components/constants';
import { LocationDataService } from '../../services';
import { AvailableTasksFilterComponent } from './available-tasks-filter.component';
import { SessionStorageService } from '../../../app/services';



describe('AvailableTasksFilterComponent', () => {
  let component: AvailableTasksFilterComponent;

  const mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem', 'setItem']);
  const location = { locationName: 'Test Name', id: '000', services: [] };

  it('should create', () => {
    component = new AvailableTasksFilterComponent({} as LocationDataService, {} as SessionStorageService, {} as Router);

    expect(component).toBeTruthy();
  });

  describe('locationLabelFunction', () => {
    const defaultLocation = { locationName: '', id: '', services: [] };
    it('should return location name', () => {
      const locationName = 'Sample Name';
      component = new AvailableTasksFilterComponent({} as LocationDataService, {} as SessionStorageService, {} as Router);

      const actual = component.locationLabelFunction({ ...defaultLocation, locationName })

      expect(actual).toEqual(locationName);
    });

    it('should return empty string', () => {
      component = new AvailableTasksFilterComponent({} as LocationDataService, {} as SessionStorageService, {} as Router);

      const actual = component.locationLabelFunction(null);

      expect(actual).toEqual('');
    });
  });

  describe('cancelFilter', () => {
    const filterDetailsMock = { nativeElement: {} };
    it(`should update the component's 'locationFilter.selection' and 'detailsElement.open'`, () => {
      component = new AvailableTasksFilterComponent({} as LocationDataService, mockSessionStorageService, {} as Router);

      mockSessionStorageService.getItem.and.callThrough();
      mockSessionStorageService.setItem.and.callThrough();
      component.locationFilter = {} as unknown as CheckboxListComponent<any>;
      component.filterDetails = filterDetailsMock as unknown as ElementRef<HTMLDetailsElement>;
      component.selection = [location];

      component.cancelFilter();

      expect(component.locationFilter).toEqual(jasmine.objectContaining({
        selection: [location]
      }));
      expect(component.detailsElement.open).toEqual(false);
    });

    it(`should NOT update the component's 'detailsElement.open'`, () => {
      component = new AvailableTasksFilterComponent({} as LocationDataService, mockSessionStorageService, {} as Router);

      mockSessionStorageService.getItem.and.callThrough();
      mockSessionStorageService.setItem.and.callThrough();
      component.locationFilter = {} as unknown as CheckboxListComponent<any>;
      component.filterDetails = null;

      component.cancelFilter();

      expect(component.detailsElement?.open).toEqual(undefined);
    });

  });

  describe('onSelectionChange', () => {
    const filterDetailsMock = { nativeElement: {} };

    it(`should setItem in sessionstorage and emit selection`, () => {
      component = new AvailableTasksFilterComponent({} as LocationDataService, mockSessionStorageService, {} as Router);

      const selectionChangedSpy = spyOn(component.selectionChanged, 'emit');
      mockSessionStorageService.getItem.and.callThrough();
      mockSessionStorageService.setItem.and.callThrough();

      component.locationFilter = { selection: [location] } as unknown as CheckboxListComponent<any>;
      component.filterDetails = filterDetailsMock as unknown as ElementRef<HTMLDetailsElement>;

      component.onSelectionChange();
      component.onSelectionChange();

      expect(component.selection).toEqual([location]);
      expect(selectionChangedSpy).toHaveBeenCalledWith([location]);
      expect(mockSessionStorageService.setItem).toHaveBeenCalledWith(FilterConstants.Session.AvailableTasks, JSON.stringify([location]));

      expect(selectionChangedSpy).toHaveBeenCalledTimes(1);
      expect(mockSessionStorageService.setItem).toHaveBeenCalledTimes(1);
    });

    it(`should NOT update component's 'selection'`, () => {
      component = new AvailableTasksFilterComponent({} as LocationDataService, mockSessionStorageService, {} as Router);

      mockSessionStorageService.getItem.and.callThrough();
      mockSessionStorageService.setItem.and.callThrough();

      component.locationFilter = undefined;
      component.filterDetails = filterDetailsMock as unknown as ElementRef<HTMLDetailsElement>;

      component.onSelectionChange();

      expect(component.selection).toEqual([]);
    });
  });

  describe('ngOnInit', () => {
    const locationDataService = {
      getLocations: jasmine.createSpy()
    };

    it(`should update component's 'preselection' and update 'locations' with session storage data`, () => {
      component = new AvailableTasksFilterComponent(locationDataService as unknown as LocationDataService, mockSessionStorageService, {} as Router);

      mockSessionStorageService.getItem.and.returnValue(JSON.stringify([location]));
      locationDataService.getLocations.and.returnValues(of([location as unknown as Location]));

      component.ngOnInit();

      expect(component.preselection).toEqual([location]);
      expect(component.locations).toEqual([location]);
    });

    it(`should NOT update component's 'locations' with session storage data`, () => {
      component = new AvailableTasksFilterComponent(locationDataService as unknown as LocationDataService, mockSessionStorageService, {} as Router);

      mockSessionStorageService.getItem.and.returnValue(null);
      locationDataService.getLocations.and.returnValues(of([location as unknown as Location]));

      component.ngOnInit();

      expect(component.preselection).not.toEqual(jasmine.objectContaining(
        [location]
      ));
    });

    it(`should navigate if getLocations errored`, () => {
      const routerSpy = {
        navigate: jasmine.createSpy()
      };

      component = new AvailableTasksFilterComponent(locationDataService as unknown as LocationDataService, mockSessionStorageService, routerSpy as unknown as Router);

      mockSessionStorageService.getItem.and.returnValue(null);
      locationDataService.getLocations.and.returnValue(throwError(new Error({ status: 500 } as unknown as string)));

      component.ngOnInit();

      expect(routerSpy.navigate).toHaveBeenCalled();
    });
  });
});
