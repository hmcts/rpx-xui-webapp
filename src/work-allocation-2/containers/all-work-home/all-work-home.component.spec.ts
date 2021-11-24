import { CdkTableModule } from '@angular/cdk/table';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule, FilterService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs/internal/observable/of';
import { ErrorMessageComponent } from '../../../app/components';
import { ALL_LOCATIONS } from '../../components/constants/locations';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { LocationDataService, WorkAllocationTaskService } from '../../services';
import { InfoMessageContainerComponent } from '../info-message-container/info-message-container.component';
import { AllWorkHomeComponent } from './all-work-home.component';

@Component({
  template: `
    <exui-all-work-home></exui-all-work-home>`
})
class WrapperComponent {
  @ViewChild(AllWorkHomeComponent) public appComponentRef: AllWorkHomeComponent;
}

describe('AllWorkHomeComponent', () => {
  let component: AllWorkHomeComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let router: Router;
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask']);
  const SELECTED_LOCATIONS = { id: 'locations', fields: [ { name: 'locations', value: ['231596', '698118'] }] };
  const mockFilterService: any = {
    getStream: () => of(SELECTED_LOCATIONS),
    get: () => SELECTED_LOCATIONS,
    persist: (setting, persistence) => null,
    givenErrors: {
      subscribe: () => null,
      next: () => null,
      unsubscribe: () => null
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        WorkAllocationComponentsModule,
        ExuiCommonLibModule
      ],
      declarations: [AllWorkHomeComponent, WrapperComponent, InfoMessageContainerComponent, ErrorMessageComponent],
      providers: [
        { provide: WorkAllocationTaskService, useValue: mockTaskService },
        { provide: LocationDataService, useValue: { getLocations: () => of(ALL_LOCATIONS) } },
        {
          provide: FilterService, useValue: mockFilterService
        },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    router = TestBed.get(Router);
    spyOn(mockFilterService.givenErrors, 'unsubscribe');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('Nav items initialised', () => {
    expect(component.subNavigationItems).not.toBeNull();
    expect(component.subNavigationItems.find((navItem) => navItem.text === 'Tasks')).not.toBeNull();
    expect(component.subNavigationItems.find((navItem) => navItem.text === 'Cases')).not.toBeNull();
  });

  afterEach(() => {
    fixture.destroy();
  });
});
