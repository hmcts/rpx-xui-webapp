import { Component } from '@angular/core';

import { ConfigConstants, SortConstants } from '../../components/constants';
import { SearchTaskParameter, SearchTaskRequest } from '../../models/dtos';
import { TaskFieldConfig } from '../../models/tasks';
import { TaskListWrapperComponent } from '../task-list-wrapper/task-list-wrapper.component';

@Component({
  selector: 'exui-my-tasks',
  templateUrl: '../task-list-wrapper/task-list-wrapper.component.html'
})
export class MyTasksComponent extends TaskListWrapperComponent {

  public get emptyMessage(): string {
    return 'You have no assigned tasks.';
  }

  public get sortSessionKey(): string {
    return SortConstants.Session.MyTasks;
  }

  /**
   * Mock TaskFieldConfig[]
   *
   * Fields is the property of the TaskFieldConfig[], containing the configuration
   * for the fields as returned by the API.
   *
   * The sorting will handled by this component, via the
   * WP api as this component.
   */
  public get fields(): TaskFieldConfig[] {
    return ConfigConstants.MyTasks;
  }

  // placeholder for derivedIcon values for myTasks until correct assignment/location given
  public sourceColumn: string = 'location';
  public matchValue: any = 'Taylor House';

  public getSearchTaskRequest(): SearchTaskRequest {
    return {
      search_parameters: [
        this.getSortParameter(),
        this.getCaseworkerParameter()
      ]
    };
  }

  public loadTasks(): void {
    super.loadTasks();
  }

  private getCaseworkerParameter(): SearchTaskParameter {
    // Always pretend to be John Smith for "My" tasks.
    return { key: 'assignee', operator: 'IN', values: [ 'John Smith' ] };
  }
}
