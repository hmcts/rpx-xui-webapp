import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Task } from '../../models/tasks';
import { getMockTasks } from '../../tests/utils.spec';
import { WorkAllocationComponentsModule } from '../work-allocation.components.module';
import { DerivedIconFieldComponent } from './derived-icon-field.component';

@Component({
  template: `<exui-derived-icon-field [task]="task" [sourceColumn]="sourceColumn" [matchValue]="matchValue"></exui-derived-icon-field>`
})
class WrapperComponent {
  @ViewChild(DerivedIconFieldComponent) public appComponentRef: DerivedIconFieldComponent;
  @Input() public task: Task = null;
  @Input() public sourceColumn: string;
  @Input() public matchValue: any;
}

/**
 * Mock tasks
 */
function getTasks(): Task[] {
  return getMockTasks();
}

describe('WorkAllocation', () => {

  describe('DerivedIconFieldComponent', () => {
    let component: DerivedIconFieldComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

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

    it('should show only if there is an icon to show', () => {
      // Expect the nativeElement to be empty (no icon yet)
      let element: HTMLElement = fixture.debugElement.nativeElement.querySelector('svg');

      // Set up the column names
      const firstExampleColumn: string = 'location';
      const secondExampleColumn: string = 'caseName';

      // Set the task, column and value to match with
      component.task = getTasks()[0];
      component.sourceColumn = firstExampleColumn;
      component.matchValue = 'Taylor House';
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('svg');
      expect(element).not.toBe(null);

      // Replace the matched value and it should no longer display
      component.matchValue = 'Not Taylor House';
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('svg');
      expect(element).toBeNull();

      // Replace the source column and it should no longer display
      component.matchValue = 'Taylor House';
      component.sourceColumn = secondExampleColumn;
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('svg');
      expect(element).toBeNull();

      // Replace the task and it should also display as the location is the same on both tasks
      component.sourceColumn = firstExampleColumn;
      component.task = getTasks()[1];
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('svg');
      expect(element).not.toBeNull();

    });

    it('should allow swapping the match for different constraints', () => {
      // Expect the nativeElement to be empty (no icon yet)
      let element: HTMLElement = fixture.debugElement.nativeElement.querySelector('svg');

      // Set up the column names
      const firstExampleColumn: string = 'location';
      const secondExampleColumn: string = 'caseName';

      // Set the task, column and value to match with
      component.task = getTasks()[0];
      component.sourceColumn = firstExampleColumn;
      component.matchValue = 'Taylor House';
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('svg');
      expect(element).not.toBe(null);

      // Set the task, column and value to match with secondly
      component.task = getTasks()[0];
      component.sourceColumn = secondExampleColumn;
      component.matchValue = 'Kili Muso';
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('svg');
      expect(element).not.toBe(null);

      // Should not match as task's caseName is different
      component.task = getTasks()[1];
      fixture.detectChanges();
      element = fixture.debugElement.nativeElement.querySelector('svg');
      expect(element).toBe(null);
    });

    it('should show the correct text content', () => {
        // Expect the nativeElement to be empty (no icon yet)
        let element: HTMLElement = fixture.debugElement.nativeElement.querySelector('svg');

        // Set up the column names
        const firstExampleColumn: string = 'location';
        const hoverWarning: string = 'There is an application task which might impact other active tasks.';

        // Set the task, column and value to match with
        component.task = getTasks()[0];
        component.sourceColumn = firstExampleColumn;
        component.matchValue = 'Taylor House';
        fixture.detectChanges();
        element = fixture.debugElement.nativeElement.querySelector('svg');
        expect(element).not.toBe(null);

        // ensure the text content is correct
        expect(element.textContent).toBe(hoverWarning);
    });

  });

});
