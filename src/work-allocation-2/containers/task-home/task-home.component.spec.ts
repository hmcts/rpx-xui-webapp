import { CdkTableModule } from '@angular/cdk/table';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule, FilterService } from '@hmcts/rpx-xui-common-lib';
import { of } from 'rxjs/internal/observable/of';

import { TaskHomeComponent } from './task-home.component';
import { InfoMessageContainerComponent } from '../info-message-container/info-message-container.component';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';
import { LocationDataService, WorkAllocationTaskService } from '../../services';
import { ErrorMessageComponent } from '../../../app/components';
import { ALL_LOCATIONS } from '../../../../api/workAllocation2/constants/locations';

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
      declarations: [TaskHomeComponent, WrapperComponent, InfoMessageContainerComponent, ErrorMessageComponent],
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

  it('should be able to set an error', () => {
    expect(component.error).toBe(undefined);
    const button: DebugElement = fixture.debugElement.query(By.css('.govuk-button.hmcts-button--secondary'));
    button.nativeElement.click();
    fixture.detectChanges();
    const checkBoxes: DebugElement = fixture.debugElement.query(By.css('.govuk-checkboxes'));
    const firstLocation = checkBoxes.nativeElement.children[0];
    const secondLocation = checkBoxes.nativeElement.children[1];
    // deselect locations if checked
    if (firstLocation.checked) {
      firstLocation.click();
    }
    if (secondLocation.checked) {
      secondLocation.click();
    }
    fixture.detectChanges();
    const applyButton: DebugElement = fixture.debugElement.query(By.css('#applyFilter'));
    applyButton.nativeElement.click();
    // expect selecteed locations to be earlier setting
    expect(component.selectedLocations.length).not.toEqual(0);
    component.error = {
      title: 'There is a problem',
      description: 'At least one location is required',
      fieldId: 'task_assignment_caseworker'
    };
    fixture.detectChanges();
    const errorMessage: DebugElement = fixture.debugElement.query(By.css('.govuk-error-summary'));
    expect(errorMessage.nativeElement).not.toBe(null);
  });

});
