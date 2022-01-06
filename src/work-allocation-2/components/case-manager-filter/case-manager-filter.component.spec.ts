import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule, FilterService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs/internal/observable/of';
import { CaseManagerFilterComponent } from '..';
import * as fromStore from '../../../app/store';

import { LocationDataService, WorkAllocationCaseService } from '../../services';
import { ALL_LOCATIONS } from '../constants/locations';

@Component({
  template: `
    <exui-case-manager-filter></exui-case-manager-filter>`
})
class WrapperComponent {
  @ViewChild(CaseManagerFilterComponent) public appComponentRef: CaseManagerFilterComponent;
}

describe('CaseManagerFilterComponent', () => {
  let component: CaseManagerFilterComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let store: Store<fromStore.State>;
  let storePipeMock: any;
  const mockCaseService = jasmine.createSpyObj('mockCaseService', ['searchCase']);
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
        HttpClientTestingModule,
        RouterTestingModule,
        ExuiCommonLibModule
      ],
      declarations: [CaseManagerFilterComponent, WrapperComponent ],
      providers: [
        provideMockStore(),
        { provide: WorkAllocationCaseService, useValue: mockCaseService },
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
    expect(component.appStoreSub).toBeDefined();
    expect(component.filterConfig.fields.length).toBe(5);
  });

  afterAll(() => {
    component.ngOnDestroy();
  });

});
