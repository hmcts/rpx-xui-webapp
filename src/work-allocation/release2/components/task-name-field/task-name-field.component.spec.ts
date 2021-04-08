import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConstants } from '../../../../app/app.constants';
import { WorkAllocationRelease2ComponentsModule } from '../work-allocation.components.module';
import { TaskNameFieldComponent } from './task-name-field.component';

@Component({
  template: `<exui-task-name-field [taskName]="taskName"></exui-task-name-field>`
})
class WrapperComponent {
  @ViewChild(TaskNameFieldComponent) public appComponentRef: TaskNameFieldComponent;
  @Input() public taskName: string;
}

describe('WorkAllocation', () => {

  describe('TaskNameFieldComponent', () => {
    const CASE_DETAILS_URL: string = AppConstants.CASE_DETAILS_URL;
    const TASK_NAME: string = 'Taskname';

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

    it('should only show a link when it has a case reference', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the taskName and it should work (showing the link).
      wrapper.taskName = TASK_NAME;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(TASK_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${TASK_NAME}`); // No spaces
    });

    // Test no longer necessary but if formatting to case reference requires removal of spaces in future this may be useful again
    /* it('should allow the case reference to be changed', () => {
      const NEW_TASK_NAME: string = 'n3w C@53    REFERENCE';

      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the taskName and it should work (showing the link).
      wrapper.taskName = TASK_NAME;
      fixture.detectChanges();
      let element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(TASK_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${TASK_NAME}`); // No spaces

      // Change the value of taskName.
      wrapper.taskName = NEW_TASK_NAME;
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe(NEW_TASK_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}n3wC@53REFERENCE`); // No spaces
    }); */

    it('should remove the link if case reference is changed to undefined', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the taskName and it should work (showing the link).
      wrapper.taskName = TASK_NAME;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(TASK_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${TASK_NAME}`); // No spaces

      // Clear out the value of taskName and we should no longer have the anchor.
      wrapper.taskName = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

    it('should remove the link if case reference is changed to null', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the taskName and it should work (showing the link).
      wrapper.taskName = TASK_NAME;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(TASK_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${TASK_NAME}`); // No spaces

      // Make taskName undefined and we should no longer have the anchor.
      wrapper.taskName = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

    it('should not show the link if case reference is simply a bunch of spaces', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add the taskName and it should work (showing the link).
      wrapper.taskName = TASK_NAME;
      fixture.detectChanges();
      const element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(TASK_NAME);
      expect(element.getAttribute('href')).toBe(`${CASE_DETAILS_URL}${TASK_NAME}`); // No spaces
    });

  });
});
