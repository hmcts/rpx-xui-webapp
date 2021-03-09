import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';

import * as dtos from '../../models/dtos';
import { Caseworker, Location } from '../../models/dtos';
import { CaseworkerDisplayName } from '../../pipes';
import { getMockCaseworkers, getMockLocations } from '../../tests/utils.spec';
import { FilterConstants } from '../constants';
import { TaskManagerFilterComponent } from './task-manager-filter.component';

@Component({
  template: `<exui-task-manager-filter (selectionChanged)="onSelectionChanged($event)"></exui-task-manager-filter>`
})
class WrapperComponent {
  @ViewChild(TaskManagerFilterComponent) public appComponentRef: TaskManagerFilterComponent;
  public changedEvents: any[] = [];
  public onSelectionChanged(locations: Location[], caseworkers: Caseworker[]): void {
    this.changedEvents.push(locations);
    this.changedEvents.push(caseworkers);
  }
}

describe('TaskManagerFilterComponent', () => {
  let component: TaskManagerFilterComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  const mockLocations: dtos.Location[] = getMockLocations();
  const mockSavedFilter = JSON.stringify([ mockLocations[0] ]);
  const mocksessionStore = {
    [FilterConstants.Session.TaskManager]: mockSavedFilter
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ExuiCommonLibModule,
        FormsModule
      ],
      declarations: [ TaskManagerFilterComponent, WrapperComponent, CaseworkerDisplayName ],
      providers: [
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    component.caseworkers = getMockCaseworkers();
    component.locations = getMockLocations();
    spyOn(sessionStorage, 'getItem').and.callFake((key) => {
      return mocksessionStore[key];
    });
    spyOn(sessionStorage, 'setItem').and.callFake((key, value) => {
      return mocksessionStore[key] = value;
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the location via id', () => {
    // Check locations being set and can be selected
    expect(component.getLocationById('a')).toEqual(getMockLocations()[0]);
    expect(component.getLocationById('b')).toEqual(getMockLocations()[1]);
    expect(component.getLocationById('c')).toEqual(getMockLocations()[2]);
    expect(component.getLocationById('d')).toEqual(getMockLocations()[3]);

    // Check all locations can be selected
    expect(component.getLocationById('**ALL_LOCATIONS**')).toEqual(FilterConstants.Options.Locations.ALL);
  });

  it('should get the caseworker via id', () => {
    // Check caseworkers being set and can be selected
    expect(component.getCaseworkerByIdamId('1')).toEqual(getMockCaseworkers()[0]);
    expect(component.getCaseworkerByIdamId('2')).toEqual(getMockCaseworkers()[1]);
    expect(component.getCaseworkerByIdamId('3')).toEqual(getMockCaseworkers()[2]);
    expect(component.getCaseworkerByIdamId('4')).toEqual(getMockCaseworkers()[3]);

    // Check all and unassigned caseworkers can be selected
    expect(component.getCaseworkerByIdamId('**ALL_CASEWORKERS**')).toEqual(FilterConstants.Options.Caseworkers.ALL);
    expect(component.getCaseworkerByIdamId('**NO_CASEWORKER_ASSIGNED**')).toEqual(FilterConstants.Options.Caseworkers.UNASSIGNED);
  });

});
