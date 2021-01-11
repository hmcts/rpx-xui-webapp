import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';

import { ConfigConstants, FilterConstants, ListConstants, SortConstants } from '../../components/constants';
import { TaskActionIds } from '../../enums';
import { Caseworker, Location, SearchTaskRequest } from '../../models/dtos';
import { InvokedTaskAction, TaskFieldConfig } from '../../models/tasks';
import { CaseworkerDisplayName } from '../../pipes';
import {
  CaseworkerDataService,
  InfoMessageCommService,
  LocationDataService,
  WorkAllocationTaskService,
} from '../../services';
import { handleFatalErrors } from '../../utils';
import { SessionStorageService } from '../../../app/services';
import { TaskListWrapperComponent } from '../task-list-wrapper/task-list-wrapper.component';

@Component({
  selector: 'exui-task-manager-list',
  templateUrl: 'task-manager-list.component.html'
})
export class TaskManagerListComponent extends TaskListWrapperComponent implements OnInit {
  public caseworkers: Caseworker[];
  public locations: Location[];
  private selectedCaseworker: Caseworker;
  private selectedLocation: Location;
  private readonly caseworkerDisplayName: CaseworkerDisplayName = new CaseworkerDisplayName();

  /**
   * Take in the Router so we can navigate when actions are clicked.
   */
  constructor(
    protected ref: ChangeDetectorRef,
    protected taskService: WorkAllocationTaskService,
    protected router: Router,
    protected infoMessageCommService: InfoMessageCommService,
    protected sessionStorageService: SessionStorageService,
    private readonly caseworkerService: CaseworkerDataService,
    private readonly locationService: LocationDataService,
    protected alertService: AlertService
  ) {
    super(ref, taskService, router, infoMessageCommService, sessionStorageService, alertService);
  }

  public get fields(): TaskFieldConfig[] {
    return ConfigConstants.TaskManager;
  }

  public get taskCount(): number {
    return this.tasks ? this.tasks.length : 0;
  }

  public get tasksLabel(): string {
    return this.taskCount === 1 ? 'task' : 'tasks';
  }

  public get sortSessionKey(): string {
    return SortConstants.Session.TaskManager;
  }

  public get view(): string {
    return ListConstants.View.TaskManager;
  }

  public ngOnInit(): void {
    super.ngOnInit();
    // Get the caseworkers and locations for this component.
    this.caseworkerService.getAll().subscribe(caseworkers => {
      this.caseworkers = [ ...caseworkers ];
    }, error => {
      handleFatalErrors(error.status, this.router);
    });
    this.locationService.getLocations().subscribe(locations => {
      this.locations = [ ...locations ];
    }, error => {
      handleFatalErrors(error.status, this.router);
    });
  }

  public onSelectionChanged(selection: { location: Location, caseworker: Caseworker }): void {
    this.selectedLocation = selection.location;
    this.selectedCaseworker = selection.caseworker;
    this.loadTasks();
  }

  public loadTasks(): void {
    if (this.locations && this.caseworkers) {
      super.loadTasks();
    }
  }

  /**
   * Override the default.
   */
  public getSearchTaskRequest(): SearchTaskRequest {
    return {
      search_parameters: [
        this.getSortParameter(),
        this.getLocationParameter(),
        this.getCaseworkerParameter()
      ]
    };
  }

  private getLocationParameter() {
    let values: string[];
    if (this.selectedLocation && this.selectedLocation !== FilterConstants.Options.Locations.ALL) {
      values = [ this.selectedLocation.locationName ];
    } else {
      values = this.locations.map(loc => loc.locationName);
    }
    return { key: 'location', operator: 'IN', values };
  }

  private getCaseworkerParameter() {
    let values: string[];
    if (this.selectedCaseworker && this.selectedCaseworker !== FilterConstants.Options.Caseworkers.ALL) {
      if (this.selectedCaseworker === FilterConstants.Options.Caseworkers.UNASSIGNED) {
        values = [];
      } else {
        values = [ this.caseworkerDisplayName.transform(this.selectedCaseworker, false) ];
      }
    } else {
      values = this.caseworkers.map(cw => this.caseworkerDisplayName.transform(cw, false));
    }
    return { key: 'assignee', operator: 'IN', values };
  }

  /**
   * InvokedTaskAction from the Task List Component, so that we can handle the User's
   * action.
   */
  public onActionHandler(taskAction: InvokedTaskAction): void {
    if (taskAction.action.id === TaskActionIds.REASSIGN) {
      const state = { returnUrl: this.returnUrl, showAssigneeColumn: true };
      this.router.navigate([`/tasks/${taskAction.action.id}/${taskAction.task.id}`], { state });
    } else {
      super.onActionHandler(taskAction);
    }
  }
}
