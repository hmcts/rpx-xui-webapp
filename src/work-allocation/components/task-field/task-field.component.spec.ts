import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFieldType, TaskView } from './../../enums';
import { Task, TaskFieldConfig } from './../../models/tasks';
import { WorkAllocationComponentsModule } from './../work-allocation.components.module';
import { TaskFieldComponent } from './task-field.component';

@Component({
  template: `<exui-task-field [config]="config" [task]="task"></exui-task-field>`
})
class WrapperComponent {
  @ViewChild(TaskFieldComponent) public appComponentRef: TaskFieldComponent;
  @Input() public config: TaskFieldConfig;
  @Input() public task: Task;
}

describe('WorkAllocation', () => {

  describe('TaskFieldComponent', () => {
    let component: TaskFieldComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    function getConfig(name: string, type: TaskFieldType): TaskFieldConfig {
      return {
        name,
        type,
        columnLabel: name,
        views: TaskView.ALL_VIEWS
      };
    }

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ WrapperComponent ],
        imports: [ WorkAllocationComponentsModule ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;
      fixture.detectChanges();
    });

    it('should show only if there is both a config and a task set', () => {
      // Expect the nativeElement to be empty.
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      // Set up the config and the task.
      const config: TaskFieldConfig = getConfig('caseName', TaskFieldType.STRING);
      const task: Task = {
        id: 'The task ID',
        caseReference: 'The case reference',
        caseName: 'The case name',
        caseCategory: 'The case category',
        location: 'The location',
        taskName: 'The task name',
        dueDate: new Date(),
        actions: []
      };

      // Add the config and it should still be empty (because there's no task).
      component.config = config;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      // Add the task and it should work (showing the case name).
      component.task = task;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe(task.caseName);

      // Remove the config, back to empty.
      component.config = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');
    });

    it('should handle a STRING type', () => {
      // Set up the config and the task.
      const config: TaskFieldConfig = getConfig('caseReference', TaskFieldType.STRING);
      const task: Task = {
        id: 'The task ID',
        caseReference: 'The case reference',
        caseName: 'The case name',
        caseCategory: 'The case category',
        location: 'The location',
        taskName: 'The task name',
        dueDate: new Date(),
        actions: []
      };

      // Add the task and it should work (showing the case reference).
      component.config = config;
      component.task = task;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe(task.caseReference);

      // Change the value of task.caseReference.
      task.caseReference = 'Bob';
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('Bob');

      // Clear out the value of task.caseReference.
      task.caseReference = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');
    });

    it('should handle a DATE_DUE type', () => {
      // No DueDateComponent shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('.due-date')).toBeNull();

      // Set up the config and the task.
      const config: TaskFieldConfig = getConfig('dueDate', TaskFieldType.DATE_DUE);
      const task: Task = {
        id: 'The task ID',
        caseReference: 'The case reference',
        caseName: 'The case name',
        caseCategory: 'The case category',
        location: 'The location',
        taskName: 'The task name',
        dueDate: new Date(),
        actions: []
      };

      // Add the task and it should work (showing the due date component).
      component.config = config;
      component.task = task;
      fixture.detectChanges();
      let element: HTMLElement = fixture.debugElement.nativeElement.querySelector('.due-date');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe('TODAY');
      expect(element.getAttribute('aria-label')).toBe('This task is due to be completed today');

      // Change the value of task.dueDate.
      task.dueDate = new Date(task.dueDate.getTime() - 86400000); // Yesterday.
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('.due-date');
      expect(element.textContent.trim()).toBe('+1 day');
      expect(element.getAttribute('aria-label')).toBe('This task is 1 day past its due date');

      // Clear out the value of task.dueDate and we should no longer have the control.
      task.dueDate = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('.due-date')).toBeNull();

      // Add it back for a moment...
      task.dueDate = new Date(new Date().getTime() - 86400000); // Yesterday.
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('.due-date');
      expect(element.textContent.trim()).toBe('+1 day');
      expect(element.getAttribute('aria-label')).toBe('This task is 1 day past its due date');

      // Set the value of task.dueDate to be null.
      task.dueDate = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('.due-date')).toBeNull();
    });

    it('should handle a DATE_AGE_DAYS type', () => {
      // Set up the config and the task.
      const config: TaskFieldConfig = getConfig('dueDate', TaskFieldType.DATE_AGE_DAYS);
      const task: Task = {
        id: 'The task ID',
        caseReference: 'The case reference',
        caseName: 'The case name',
        caseCategory: 'The case category',
        location: 'The location',
        taskName: 'The task name',
        dueDate: new Date(), // TODAY
        actions: []
      };

      // Add the task and it should work (showing the days from today).
      component.config = config;
      component.task = task;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('0 days');

      // Change the value of task.dueDate to be yesterday.
      task.dueDate = new Date(task.dueDate.getTime() - 86400000); // Yesterday.
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('+1 day');

      // Change the value of task.dueDate to be the day before yesterday.
      task.dueDate = new Date(task.dueDate.getTime() - 86400000); // Day before yesterday.
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('+2 days');

      // Change the value of task.dueDate to be tomorrow.
      task.dueDate = new Date(new Date().getTime() + 86400000); // Tomorrow.
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('-1 day');

      // Change the value of task.dueDate to be the da after tomorrow.
      task.dueDate = new Date(task.dueDate.getTime() + 86400000); // Day after tomorrow.
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('-2 days');

      // Clear out the value of task.dueDate and we should have no text.
      task.dueDate = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');
    });

    it('should handle a DATE type', () => {
      // Set up the config and the task.
      const config: TaskFieldConfig = getConfig('dueDate', TaskFieldType.DATE);
      const task: Task = {
        id: 'The task ID',
        caseReference: 'The case reference',
        caseName: 'The case name',
        caseCategory: 'The case category',
        location: 'The location',
        taskName: 'The task name',
        dueDate: new Date(2020, 10, 6, 1, 2, 3), // Month of 10 = November as it's 0-based.
        actions: []
      };

      // Add the task and it should work (showing the due date).
      component.config = config;
      component.task = task;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('06/11/2020');

      // Change the value of task.dueDate.
      task.dueDate = new Date(2020, 11, 15, 14, 15, 16); // Month of 11 = December.
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('15/12/2020');

      // Clear out the value of task.dueDate.
      task.dueDate = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');
    });

    it('should handle a DATETIME type', () => {
      // Set up the config and the task.
      const config: TaskFieldConfig = getConfig('dueDate', TaskFieldType.DATETIME);
      const task: Task = {
        id: 'The task ID',
        caseReference: 'The case reference',
        caseName: 'The case name',
        caseCategory: 'The case category',
        location: 'The location',
        taskName: 'The task name',
        dueDate: new Date(2020, 10, 6, 1, 2, 3), // Month of 10 = November as it's 0-based.
        actions: []
      };

      // Add the task and it should work (showing the due date and time).
      component.config = config;
      component.task = task;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('06/11/2020 01:02');

      // Change the value of task.dueDate.
      task.dueDate = new Date(2020, 11, 15, 14, 15, 16); // Month of 11 = December.
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('15/12/2020 14:15');

      // Clear out the value of task.dueDate.
      task.dueDate = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');
    });

    it('should handle a BOOLEAN type', () => {
      // Set up the config and the task.
      const config: TaskFieldConfig = getConfig('happy', TaskFieldType.BOOLEAN);
      const task: Task = {
        id: 'The task ID',
        caseReference: 'The case reference',
        caseName: 'The case name',
        caseCategory: 'The case category',
        location: 'The location',
        taskName: 'The task name',
        dueDate: new Date(),
        happy: true,
        actions: []
      };

      // Add the task and it should work (showing the result for "happy").
      component.config = config;
      component.task = task;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('Yes');

      // Change the value of task.happy.
      task['happy'] = false;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('No');

      // Clear out the value of task.happy.
      task['happy'] = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      // Add it back in for a moment...
      task['happy'] = false;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('No');

      // Null the value of task.happy.
      task['happy'] = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      // Add it back again...
      task['happy'] = false;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('No');

      // Give the value of task.happy a "truthy" value.
      task['happy'] = 1;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      // Give the value of task.happy a "falsey" value.
      task['happy'] = 0;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      // Give the value of task.happy a string value.
      task['happy'] = 'True';
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      // Set it back to something meaningful again...
      task['happy'] = false;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('No');

      // Now remove the property entirely and make sure it can cope with it not existing.
      expect(task.hasOwnProperty('happy')).toBeTruthy();
      delete task['happy'];
      fixture.detectChanges();
      expect(task.hasOwnProperty('happy')).toBeFalsy();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');
    });

    it('should handle an INTEGER type', () => {
      // Set up the config and the task.
      const config: TaskFieldConfig = getConfig('pi', TaskFieldType.INTEGER);
      const task: Task = {
        id: 'The task ID',
        caseReference: 'The case reference',
        caseName: 'The case name',
        caseCategory: 'The case category',
        location: 'The location',
        taskName: 'The task name',
        dueDate: new Date(),
        pi: Math.PI,
        actions: []
      };

      // Add the task and it should work (showing the integer value of "pi").
      component.config = config;
      component.task = task;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('3'); // 3.14159... => 3

      // Change the value of task.pi.
      task['pi'] = 1500;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('1,500');

      // Change the value of task.pi again.
      task['pi'] = 0.51;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('1'); // Rounded up.

      // Clear out the value of task.pi.
      task['pi'] = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      // Add it back for a moment...
      task['pi'] = 0.51;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('1'); // Rounded up.

      // Null the value of task.pi.
      task['pi'] = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      // Add it back again...
      task['pi'] = 0.51;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('1'); // Rounded up.

      // Set task.pi to be a string.
      task['pi'] = '3.14159';
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('3'); // Numeric string.

      // Now remove the property entirely and make sure it can cope with it not existing.
      expect(task.hasOwnProperty('pi')).toBeTruthy();
      delete task['pi'];
      fixture.detectChanges();
      expect(task.hasOwnProperty('pi')).toBeFalsy();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');
    });

    it('should handle an DECIMAL_2 type', () => {
      // Set up the config and the task.
      const config: TaskFieldConfig = getConfig('pi', TaskFieldType.DECIMAL_2);
      const task: Task = {
        id: 'The task ID',
        caseReference: 'The case reference',
        caseName: 'The case name',
        caseCategory: 'The case category',
        location: 'The location',
        taskName: 'The task name',
        dueDate: new Date(),
        pi: Math.PI,
        actions: []
      };

      // Add the task and it should work (showing "pi" rounded to 2 decimal places).
      component.config = config;
      component.task = task;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('3.14'); // 3.14159... => 3.14

      // Change the value of task.pi.
      task['pi'] = 1500;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('1,500.00'); // Still 2 dp.

      // Change the value of task.pi again.
      task['pi'] = 0.5151;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('0.52'); // Rounded up.

      // Clear out the value of task.pi.
      task['pi'] = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      // Add it back for a moment...
      task['pi'] = 0.5151;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('0.52'); // Rounded up.

      // Null the value of task.pi.
      task['pi'] = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');

      // Add it back again...
      task['pi'] = 0.5151;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('0.52'); // Rounded up.

      // Set task.pi to be a string.
      task['pi'] = '3.14159';
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('3.14'); // Numeric string.

      // Now remove the property entirely and make sure it can cope with it not existing.
      expect(task.hasOwnProperty('pi')).toBeTruthy();
      delete task['pi'];
      fixture.detectChanges();
      expect(task.hasOwnProperty('pi')).toBeFalsy();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');
    });

    it('should handle a URL type', () => {
      const HMCTS_URL: string = 'http://hmcts.gov.uk';
      const GOOGLE_URL: string = 'http://google.com';

      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Set up the config and the task.
      const config: TaskFieldConfig = getConfig('link', TaskFieldType.URL);
      const task: Task = {
        id: 'The task ID',
        caseReference: 'The case reference',
        caseName: 'The case name',
        caseCategory: 'The case category',
        location: 'The location',
        taskName: 'The task name',
        dueDate: new Date(),
        actions: [],
        link: HMCTS_URL
      };

      // Add the task and it should work (showing the due date component).
      component.config = config;
      component.task = task;
      fixture.detectChanges();
      let element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(HMCTS_URL);
      expect(element.getAttribute('href')).toBe(HMCTS_URL);

      // Change the value of task.link.
      task['link'] = GOOGLE_URL;
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe(GOOGLE_URL);
      expect(element.getAttribute('href')).toBe(GOOGLE_URL);

      // Clear out the value of task.link and we should no longer have the anchor.
      task['link'] = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add it back for a moment...
      task['link'] = GOOGLE_URL;
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe(GOOGLE_URL);
      expect(element.getAttribute('href')).toBe(GOOGLE_URL);

      // Make task.link null.
      task['link'] = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add it back for a moment...
      task['link'] = GOOGLE_URL;
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe(GOOGLE_URL);
      expect(element.getAttribute('href')).toBe(GOOGLE_URL);

      // Entirely remove the property for task.link.
      expect(task.hasOwnProperty('link')).toBeTruthy();
      delete task['link'];
      fixture.detectChanges();
      expect(task.hasOwnProperty('link')).toBeFalsy();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

    it('should handle an image type', () => {
      const EXAMPLE1_IMAGE: string = '/assets/images/test.jpg';
      const EXAMPLE2_IMAGE: string = '/assets/images/govuk-crest.png';

      // No image shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('img')).toBeNull();

      // Set up the config and the task.
      const config: TaskFieldConfig = getConfig('image', TaskFieldType.IMAGE);
      const task: Task = {
        id: 'The task ID',
        caseReference: 'The case reference',
        caseName: 'The case name',
        caseCategory: 'The case category',
        location: 'The location',
        taskName: 'The task name',
        dueDate: new Date(),
        actions: [],
        image: EXAMPLE1_IMAGE
      };

      // Add the task and it should work (showing the image component).
      component.config = config;
      component.task = task;
      fixture.detectChanges();
      let element: HTMLElement = fixture.debugElement.nativeElement.querySelector('img');
      expect(element).not.toBeNull();
      expect(element.getAttribute('src')).toBe(EXAMPLE1_IMAGE);
      expect(element.getAttribute('alt')).toBe('Image');

       // Change the value of task.image
      task['image'] = EXAMPLE2_IMAGE;
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element.getAttribute('src')).toBe(EXAMPLE2_IMAGE);
      expect(element.getAttribute('alt')).toBe('Image');

      // Clear out the value of task.image and we should no longer have the anchor.
      task['image'] = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('img')).toBeNull();

      // Add it back for a moment...
      task['image'] = EXAMPLE1_IMAGE;
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element.getAttribute('src')).toBe(EXAMPLE1_IMAGE);
      expect(element.getAttribute('alt')).toBe('Image');

      // Make task.image null.
      task['image'] = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('img')).toBeNull();

      // Add it back for a moment...
      task['image'] = EXAMPLE1_IMAGE;
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('img');
      expect(element.getAttribute('src')).toBe(EXAMPLE1_IMAGE);
      expect(element.getAttribute('alt')).toBe('Image');

      // Entirely remove the property for task.image.
      expect(task.hasOwnProperty('image')).toBeTruthy();
      delete task['image'];
      fixture.detectChanges();
      expect(task.hasOwnProperty('image')).toBeFalsy();
      expect(fixture.debugElement.nativeElement.querySelector('img')).toBeNull();
    });

    it('should handle a CASE_REFERENCE type', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Set up the config and the task.
      const config: TaskFieldConfig = getConfig('caseReference', TaskFieldType.CASE_REFERENCE);
      const task: Task = {
        id: 'The task ID',
        caseReference: 'The case reference',
        caseName: 'The case name',
        caseCategory: 'The case category',
        location: 'The location',
        taskName: 'The task name',
        dueDate: new Date(),
        actions: []
      };

      // Add the task and it should work (showing the link).
      component.config = config;
      component.task = task;
      fixture.detectChanges();
      let element: HTMLElement = fixture.debugElement.nativeElement.querySelector('a');
      expect(element).not.toBeNull();
      expect(element.textContent.trim()).toBe(task.caseReference);
      expect(element.getAttribute('href')).toBe(`/cases/case-details/Thecasereference`); // No spaces

      // Change the value of task.caseReference.
      task.caseReference = 'NEW CASE REFERENCE';
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe('NEW CASE REFERENCE');
      expect(element.getAttribute('href')).toBe(`/cases/case-details/NEWCASEREFERENCE`); // No spaces

      // Clear out the value of task.link and we should no longer have the anchor.
      task.caseReference = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add it back for a moment...
      task.caseReference = 'The case reference';
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe('The case reference');
      expect(element.getAttribute('href')).toBe(`/cases/case-details/Thecasereference`);

      // Make task.link null.
      task.caseReference = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

  });

});
