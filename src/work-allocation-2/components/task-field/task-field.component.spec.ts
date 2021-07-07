import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldConfig } from '../../models/common';
import { FieldType, TaskView } from './../../enums';
import { Task } from './../../models/tasks';
import { WorkAllocationComponentsModule } from '../work-allocation.components.module';
import { TaskFieldComponent } from './task-field.component';

@Component({
  template: `<exui-task-field [config]="config" [task]="task"></exui-task-field>`
})
class WrapperComponent {
  @ViewChild(TaskFieldComponent) public appComponentRef: TaskFieldComponent;
  @Input() public config: FieldConfig;
  @Input() public task: Task;
}

describe('WorkAllocation', () => {

  describe('TaskFieldComponent', () => {
    let component: TaskFieldComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    function getConfig(name: string, type: FieldType): FieldConfig {
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
      const config: FieldConfig = getConfig('caseName', FieldType.STRING);
      const task: Task = {
        id: 'The task ID',
        case_id: 'The case reference',
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
      const config: FieldConfig = getConfig('case_id', FieldType.STRING);
      const task: Task = {
        id: 'The task ID',
        case_id: 'The case reference',
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
      expect(fixture.debugElement.nativeElement.innerText).toBe(task.case_id);

      // Change the value of task.case_id.
      task.case_id = 'Bob';
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('Bob');

      // Clear out the value of task.case_id.
      task.case_id = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');
    });

    it('should handle a DATE_DUE type', () => {
      // No DueDateComponent shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('.due-date')).toBeNull();

      // Set up the config and the task.
      const config: FieldConfig = getConfig('dueDate', FieldType.DATE_DUE);
      const task: Task = {
        id: 'The task ID',
        case_id: 'The case reference',
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
      const config: FieldConfig = getConfig('dueDate', FieldType.DATE_AGE_DAYS);
      const task: Task = {
        id: 'The task ID',
        case_id: 'The case reference',
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
      const config: FieldConfig = getConfig('dueDate', FieldType.DATE);
      const task: Task = {
        id: 'The task ID',
        case_id: 'The case reference',
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
      const config: FieldConfig = getConfig('dueDate', FieldType.DATETIME);
      const task: Task = {
        id: 'The task ID',
        case_id: 'The case reference',
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
      const config: FieldConfig = getConfig('happy', FieldType.BOOLEAN);
      const task: Task = {
        id: 'The task ID',
        case_id: 'The case reference',
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
      const config: FieldConfig = getConfig('pi', FieldType.INTEGER);
      const task: Task = {
        id: 'The task ID',
        case_id: 'The case reference',
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
      const config: FieldConfig = getConfig('pi', FieldType.DECIMAL_2);
      const task: Task = {
        id: 'The task ID',
        case_id: 'The case reference',
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
      const config: FieldConfig = getConfig('link', FieldType.URL);
      const task: Task = {
        id: 'The task ID',
        case_id: 'The case reference',
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
      const config: FieldConfig = getConfig('image', FieldType.IMAGE);
      const task: Task = {
        id: 'The task ID',
        case_id: 'The case reference',
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
      const config: FieldConfig = getConfig('case_id', FieldType.CASE_REFERENCE);
      const task: Task = {
        id: 'The task ID',
        case_id: 'The case reference',
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
      expect(element.textContent.trim()).toBe(task.case_id);
      expect(element.getAttribute('href')).toBe(`/cases/case-details/The case reference`); // Spaces allowed

      // Change the value of task.case_id.
      task.case_id = 'NEW CASE REFERENCE';
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe('NEW CASE REFERENCE');
      expect(element.getAttribute('href')).toBe(`/cases/case-details/NEW CASE REFERENCE`); // Spaces allowed

      // Clear out the value of task.link and we should no longer have the anchor.
      task.case_id = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add it back for a moment...
      task.case_id = 'The case reference';
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe('The case reference');
      expect(element.getAttribute('href')).toBe(`/cases/case-details/The case reference`);

      // Make task.link null.
      task.case_id = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

    it('should handle a CASE_NAME type', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Set up the config and the task.
      const config: FieldConfig = getConfig('caseName', FieldType.CASE_NAME);
      const task: Task = {
        id: 'The task ID',
        case_id: '1',
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
      expect(element.textContent.trim()).toBe(task.caseName);
      expect(element.getAttribute('href')).toBe(`/cases/case-details/1`);

      // Change the value of task.case_id.
      task.case_id = 'NEW CASE REFERENCE';
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe(task.caseName);
      expect(element.getAttribute('href')).toBe(`/cases/case-details/NEW CASE REFERENCE`);

      // Clear out the value of task.link and we should no longer have the anchor.
      task.case_id = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add it back for a moment...
      task.case_id = 'The case reference';
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe(task.caseName);
      expect(element.getAttribute('href')).toBe(`/cases/case-details/The case reference`);

      // Make task.link null.
      task.case_id = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

    // Note: test will need to be changed when additional functionality required for the Task tab
    it('should handle a TASK_NAME type', () => {
      // No anchor shown yet.
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Set up the config and the task.
      const config: FieldConfig = getConfig('taskName', FieldType.TASK_NAME);
      const task: Task = {
        id: 'The task ID',
        case_id: '1',
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
      expect(element.textContent.trim()).toBe(task.taskName);
      expect(element.getAttribute('href')).toBe(`/cases/case-details/1`);

      // Change the value of task.case_id.
      task.case_id = 'NEW CASE REFERENCE';
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe(task.taskName);
      expect(element.getAttribute('href')).toBe(`/cases/case-details/NEW CASE REFERENCE`);

      // Clear out the value of task.link and we should no longer have the anchor.
      task.case_id = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();

      // Add it back for a moment...
      task.case_id = 'The case reference';
      fixture.detectChanges();
      expect(element).not.toBeNull();
      element = fixture.debugElement.nativeElement.querySelector('a');
      expect(element.textContent.trim()).toBe(task.taskName);
      expect(element.getAttribute('href')).toBe(`/cases/case-details/The case reference`);

      // Make task.link null.
      task.case_id = null;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('a')).toBeNull();
    });

    it('should handle a CASE_REFERENCE_AS_STRING type', () => {

      // Set up the config and the task.
      const config: FieldConfig = getConfig('case_id', FieldType.CASE_REFERENCE_STRING);
      const task: Task = {
        id: 'The task ID',
        case_id: '1234567890987654',
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
      expect(fixture.debugElement.nativeElement.innerText).toBe('1234-5678-9098-7654');

      // Change the value of task.case_id.
      task.case_id = '9876543210123456';
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('9876-5432-1012-3456');

      // Clear out the value of task.case_id.
      task.case_id = undefined;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toBe('');
    });

    it('should appropriately parse an ISO date string with toDate', () => {
      const DATE = '2020-12-03T15:00:00';
      const output = component.toDate(DATE);
      expect(output).toBeDefined();
      expect(output.getFullYear()).toEqual(2020);
      expect(output.getMonth()).toEqual(11); // 0-based.
      expect(output.getDate()).toEqual(3);
      expect(output.getHours()).toEqual(15);
      expect(output.getMinutes()).toEqual(0);
    });

    it('should appropriately parse a number with toDate', () => {
      const DATE = '2020-12-03T15:00:00';
      const EPOCH = Date.parse(DATE);
      const output = component.toDate(EPOCH);
      expect(output).toBeDefined();
      expect(output.getFullYear()).toEqual(2020);
      expect(output.getMonth()).toEqual(11); // 0-based.
      expect(output.getDate()).toEqual(3);
      expect(output.getHours()).toEqual(15);
      expect(output.getMinutes()).toEqual(0);
    });

    it('should appropriately parse a date with toDate', () => {
      const DATE = new Date(2020, 11, 3, 15, 0, 0);
      const output = component.toDate(DATE);
      expect(output).toBeDefined();
      expect(output.getFullYear()).toEqual(2020);
      expect(output.getMonth()).toEqual(11); // 0-based.
      expect(output.getDate()).toEqual(3);
      expect(output.getHours()).toEqual(15);
      expect(output.getMinutes()).toEqual(0);
    });

    it('should appropriately handle an invalid input in toDate', () => {
      const output = component.toDate('bob');
      expect(output).toBeNull();
    });

    it('should appropriately handle an null input in toDate', () => {
      const output = component.toDate(null);
      expect(output).toBeNull();
    });

    it('should appropriately handle an undefined input in toDate', () => {
      const output = component.toDate(undefined);
      expect(output).toBeNull();
    });

    it('should appropriately handle an empty string input in toDate', () => {
      const output = component.toDate('');
      expect(output).toBeNull();
    });
  });

});
