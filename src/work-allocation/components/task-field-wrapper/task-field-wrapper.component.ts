import { Component, ViewEncapsulation } from '@angular/core';

import { TaskFieldType, TaskView } from '../../enums';
import { Task, TaskAction, TaskFieldConfig } from '../../models/tasks';

@Component({
  selector: 'exui-task-field-wrapper',
  templateUrl: './task-field-wrapper.component.html',
  styleUrls: ['task-field-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskFieldWrapperComponent {

  protected imageRow: { height: string } = { height: '30' };
  private readonly taskAction: TaskAction = {
    id: 'Action ID',
    title: 'Action title'
  };
  private readonly now: Date = new Date();
  private readonly tomorrow: Date = new Date(this.now.getTime() + 86400000);
  public task: Task = {
    id: 'The task ID',
    caseReference: 'The case reference',
    caseName: 'The case name',
    caseCategory: 'The case category',
    location: 'The location',
    taskName: 'The task name',
    dueDate: this.now,
    dueDateText: this.now.toLocaleDateString(),
    actions: [this.taskAction],
    tomorrow: this.tomorrow,
    tomorrowText: `${this.tomorrow.toLocaleDateString()} ${this.tomorrow.toLocaleTimeString()}`,
    happy: true,
    pi: Math.PI,
    google: 'http://www.google.com',
    image: 'https://www.hmctsjobs.co.uk/wp-content/themes/HMCTS/dist/images/HM-CTS-logo.png'
  };

  public FIELDS = {
    caseName: {
      name: 'caseName',
      type: TaskFieldType.STRING,
      columnLabel: 'Case name',
      views: TaskView.ALL_VIEWS
    },
    dueDate: {
      name: 'dueDate',
      type: TaskFieldType.DATE_DUE,
      columnLabel: 'Due date (component; updates on blur)',
      views: TaskView.ALL_VIEWS
    },
    daysFromToday: {
      name: 'dueDate',
      type: TaskFieldType.DATE_AGE_DAYS,
      columnLabel: 'Days from today (positive if before today; updates on blur)',
      views: TaskView.ALL_VIEWS
    },
    date: {
      name: 'dueDate',
      type: TaskFieldType.DATE,
      columnLabel: 'Due date (as date; updates on blur)',
      views: TaskView.ALL_VIEWS
    },
    tomorrow: {
      name: 'tomorrow',
      type: TaskFieldType.DATETIME,
      columnLabel: 'Tomorrow (with time; updates on blur)',
      views: TaskView.ALL_VIEWS
    },
    happy: {
      name: 'happy',
      type: TaskFieldType.BOOLEAN,
      columnLabel: 'Boolean to Yes/No/blank',
      views: TaskView.ALL_VIEWS
    },
    piAsInt: {
      name: 'pi',
      type: TaskFieldType.INTEGER,
      columnLabel: 'Number as integer',
      views: TaskView.ALL_VIEWS
    },
    piTo2DP: {
      name: 'pi',
      type: TaskFieldType.DECIMAL_2,
      columnLabel: 'Number to 2 decimal places',
      views: TaskView.ALL_VIEWS
    },
    google: {
      name: 'google',
      type: TaskFieldType.URL,
      columnLabel: 'Link (opens in this window)',
      views: TaskView.ALL_VIEWS
    },
    image: {
      name: 'image',
      type: TaskFieldType.IMAGE,
      columnLabel: 'Image (sized to row height)',
      views: TaskView.ALL_VIEWS
    }
  };

  public setDate(value: string, config: TaskFieldConfig): void {
    const fixed: string = this.fixDate(value);
    if (fixed) {
      const parsedDate: number = Date.parse(fixed);
      if (isNaN(parsedDate) === false) {
        const d: Date = new Date(parsedDate);
        this.task[config.name] = d;
        this.task[`${config.name}Text`] = d.toLocaleDateString();
      }
    }
  }

  public setDateTime(value: string, config: TaskFieldConfig): void {
    const [ date, time ] = value.split(' ');
    if (date && time) {
      const fixed: string = this.fixDate(date);
      if (fixed) {
        const parsedDate: number = Date.parse(`${fixed}T${time}`);
        if (isNaN(parsedDate) === false) {
          const d: Date = new Date(parsedDate);
          this.task[config.name] = d;
          this.task[`${config.name}Text`] = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
        }
      }
    }
  }

  // Simply flips dd/MM/yyyy to yyyy-MM-dd for parsing purposes.
  private fixDate(value: string): string {
    const parts: string[] = value.split('/');
    if (parts.length === 3) {
      return parts.reverse().join('-');
    }
    return undefined;
  }
}
