import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { FieldType } from '../../enums';
import { Case } from '../../models/cases';
import { FieldConfig } from '../../models/common';
import { Task } from '../../models/tasks';

@Component({
  selector: 'exui-work-field',
  templateUrl: './work-field.component.html',
  styleUrls: ['./work-field.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkFieldComponent {
  /**
   * The configuration for this particular field, which is needed
   * to obtain the correct value from the task and determine how it
   * should be rendered.
   */
  @Input() public config: FieldConfig;

  /**
   * The task, which contains the value we want to render in this
   * component. Which value we want is determined by the config.
   */
  @Input() public workField: Task | Case;
  @Output() public itemClick = new EventEmitter<Task | Case>();

  // This is here for the ngSwitch in the template, so we don't have
  // hard-coded strings floating around the place.
  protected fieldType = FieldType;
  public clickSubject = new Subject<Task | Case>();

  constructor() {
    this.clickSubject.pipe(
      take(1)
    ).subscribe((item) => this.itemClick.emit(item));
  }

  /**
   * Convert a string, number, or Date to date object.
   */
  public toDate(value: string | number | Date): Date {
    if (value) {
      const d = new Date(value);
      return isNaN(d.getTime()) ? null : d;
    }
    return null;
  }

  public onClick() {
    if (this.workField.role !== 'specific-access-denied') {
      this.clickSubject.next(this.workField);
    }
  }
}
