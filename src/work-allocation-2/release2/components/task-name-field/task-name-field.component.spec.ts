import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConstants } from '../../../../app/app.constants';
import { WorkAllocationRelease2ComponentsModule } from '../work-allocation.components.module';
import { TaskNameFieldComponent } from './task-name-field.component';

@Component({
  template: `<exui-task-name-field [taskName]="taskName" [caseId]='caseId'></exui-task-name-field>`
})
class WrapperComponent {
  @ViewChild(TaskNameFieldComponent) public appComponentRef: TaskNameFieldComponent;
  @Input() public taskName: string;
  @Input() public caseId: string;
}

describe('WorkAllocation', () => {

  describe('TaskNameFieldComponent', () => {
    const CASE_DETAILS_URL: string = AppConstants.CASE_DETAILS_URL;
    const TASK_NAME: string = 'Taskname';
    const CASE_ID: string = 'CaseId';

    let component: TaskNameFieldComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ WrapperComponent ],
        imports: [ WorkAllocationRelease2ComponentsModule ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;
      fixture.detectChanges();
    });

    it('should only show a link when it has a case id', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the taskName and it should work (showing the link).
      wrapper.taskName = TASK_NAME;
      wrapper.caseId = CASE_ID;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(TASK_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${CASE_ID}`); // No spaces
    });

    it('should remove the link if case id is changed to undefined', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the taskName and it should work (showing the link).
      wrapper.taskName = TASK_NAME;
      wrapper.caseId = CASE_ID;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(TASK_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${CASE_ID}`); // No spaces

      // Clear out the value of taskName and we should no longer have the anchor.
      wrapper.caseId = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

    it('should remove the link if case id is changed to null', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the taskName and it should work (showing the link).
      wrapper.taskName = TASK_NAME;
      wrapper.caseId = CASE_ID;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(TASK_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${CASE_ID}`); // No spaces

      // Make taskName undefined and we should no longer have the anchor.
      wrapper.caseId = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

  });
});
