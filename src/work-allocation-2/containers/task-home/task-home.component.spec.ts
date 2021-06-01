import { CdkTableModule } from '@angular/cdk/table';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule, FilterService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs/internal/observable/of';
import { ALL_LOCATIONS } from '../../../../api/workAllocation2/constants/locations';

import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { LocationDataService, WorkAllocationTaskService } from '../../services';
import { InfoMessageContainerComponent } from '../info-message-container/info-message-container.component';
import { TaskHomeComponent } from './task-home.component';

@Component({
  template: `
    <exui-task-home></exui-task-home>`
})
class WrapperComponent {
  @ViewChild(TaskHomeComponent) public appComponentRef: TaskHomeComponent;
}

describe('TaskHomeComponent', () => {
  let component: TaskHomeComponent;
  let wrapper: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;
  let router: Router;
  const mockTaskService = jasmine.createSpyObj('mockTaskService', ['searchTask']);
  const SELECTED_LOCATIONS = { id: 'locations', fields: [ { name: 'locations', value: ['231596', '698118'] }] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        ExuiCommonLibModule,
        RouterTestingModule,
        WorkAllocationComponentsModule,
        ExuiCommonLibModule
      ],
      declarations: [TaskHomeComponent, WrapperComponent, InfoMessageContainerComponent],
      providers: [
        { provide: WorkAllocationTaskService, useValue: mockTaskService },
        { provide: LocationDataService, useValue: { getLocations: () => of(ALL_LOCATIONS) } },
        {
          provide: FilterService, useValue: {
            getStream: () => of(SELECTED_LOCATIONS),
            get: () => SELECTED_LOCATIONS,
          }
        },
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(WrapperComponent);
    wrapper = fixture.componentInstance;
    component = wrapper.appComponentRef;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should show the toggle filter button', () => {
    const button: DebugElement = fixture.debugElement.query(By.css('.govuk-button.hmcts-button--secondary'));
    expect(button.nativeElement.innerText).toContain('Show work filter');
  });

  it('should select two locations', fakeAsync(() => {
    const button: DebugElement = fixture.debugElement.query(By.css('.govuk-button.hmcts-button--secondary'));
    button.nativeElement.click();

    fixture.detectChanges();
    const checkBoxes: DebugElement = fixture.debugElement.query(By.css('.govuk-checkboxes'));
    const firstLocation = checkBoxes.nativeElement.children[0];
    const secondLocation = checkBoxes.nativeElement.children[1];

    firstLocation.click();
    secondLocation.click();

    fixture.detectChanges();
    const applyButton: DebugElement = fixture.debugElement.query(By.css('#applyFilter'));
    applyButton.nativeElement.click();
    expect(component.selectedLocations.length).toEqual(2);

  }));
});
