import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule, FilterService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs/internal/observable/of';
import { TaskManagerFilterComponent } from '..';
import * as fromStore from '../../../app/store';

import { LocationDataService, WorkAllocationTaskService } from '../../services';
import { ALL_LOCATIONS } from '../constants/locations';

@Component({
  template: `
    <exui-task-manager-filter></exui-task-manager-filter>`
})
class WrapperComponent {
  @ViewChild(TaskManagerFilterComponent) public appComponentRef: TaskManagerFilterComponent;
}

describe('TaskManagerFilterComponent', () => {
  let component: TaskManagerFilterComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let store: Store<fromStore.State>;
  let storePipeMock: any;
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask']);
  const SELECTED_LOCATIONS = { id: 'locations', fields: [ { name: 'locations', value: ['231596', '698118'] }] };
  const mockFilterService: any = {
    getStream: () => of(SELECTED_LOCATIONS),
    get: jasmine.createSpy(),
    persist: jasmine.createSpy(),
    givenErrors: {
      subscribe: jasmine.createSpy(),
      next: () => null,
      unsubscribe: () => null
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        HttpClientModule,
        RouterTestingModule,
        ExuiCommonLibModule
      ],
      declarations: [TaskManagerFilterComponent, WrapperComponent ],
      providers: [
        provideMockStore(),
        { provide: WorkAllocationTaskService, useValue: mockTaskService },
        { provide: LocationDataService, useValue: { getLocations: () => of(ALL_LOCATIONS) } },
        {
          provide: FilterService, useValue: mockFilterService
        },
      ]
    }).compileComponents();
    store = TestBed.get(Store);
    storePipeMock = spyOn(store, 'pipe');

    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    storePipeMock.and.returnValue(of(0));
    mockFilterService.get.and.returnValue(null);
    fixture.detectChanges();
    spyOn(component.appStoreSub, 'unsubscribe');
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should subscribe to the store and the filterService', () => {
    expect(storePipeMock).toHaveBeenCalled();
    expect(component.filterSub).toBeDefined();
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

});
