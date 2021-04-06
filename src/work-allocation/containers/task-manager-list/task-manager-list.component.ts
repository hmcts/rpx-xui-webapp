import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';

import { ConfigConstants, FilterConstants, ListConstants, SortConstants } from '../../components/constants';
import { Caseworker, Location, SearchTaskRequest } from '../../models/dtos';
import { TaskFieldConfig } from '../../models/tasks';
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
import { WorkAllocationFeatureService } from 'src/work-allocation/services/work-allocation-feature.service';

@Component({
  selector: 'exui-task-manager-list',
  templateUrl: 'task-manager-list.component.html'
})
export class TaskManagerListComponent extends TaskListWrapperComponent implements OnInit {
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
    protected readonly caseworkerService: CaseworkerDataService,
    private readonly locationService: LocationDataService,
    protected alertService: AlertService,
    protected workAllocationFeatureService: WorkAllocationFeatureService
  ) {
    super(ref, taskService, router, infoMessageCommService, sessionStorageService, alertService, caseworkerService, workAllocationFeatureService);
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
        this.getLocationParameter(),
        this.getCaseworkerParameter()
      ],
      sorting_parameters: [this.getSortParameter()]
    };
  }

  private getLocationParameter() {
    let values: string[];
    if (this.selectedLocation && this.selectedLocation !== FilterConstants.Options.Locations.ALL) {
      values = [ this.selectedLocation.id ];
    } else {
      values = this.locations.map(loc => loc.id);
    }
    return { key: 'location', operator: 'IN', values };
  }

  private getCaseworkerParameter() {
    let values: string[];
    if (this.selectedCaseworker && this.selectedCaseworker !== FilterConstants.Options.Caseworkers.ALL) {
      if (this.selectedCaseworker === FilterConstants.Options.Caseworkers.UNASSIGNED) {
        values = [];
      } else {
        values = [this.selectedCaseworker.idamId]
      }
    } else {
      values = []
    }
    return { key: 'user', operator: 'IN', values };
  }
}
