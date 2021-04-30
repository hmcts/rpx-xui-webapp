import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';

import { ConfigConstants, FilterConstants, ListConstants, SortConstants } from '../../components/constants';
import { Caseworker, Location, SearchTaskRequest } from '../../models/dtos';
import { TaskFieldConfig } from '../../models/tasks';
import {
  CaseworkerDataService,
  InfoMessageCommService,
  LocationDataService,
  WorkAllocationFeatureService,
  WorkAllocationTaskService
} from '../../services';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../utils';
import { SessionStorageService } from '../../../app/services';
import { TaskListWrapperComponent } from '../task-list-wrapper/task-list-wrapper.component';
import { UserInfo } from 'src/app/models/user-details.model';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { CaseworkerDisplayName } from '../../pipes';

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
    protected loadingService: LoadingService,
    protected featureService: WorkAllocationFeatureService
  ) {
    super(ref, taskService, router, infoMessageCommService, sessionStorageService, alertService, caseworkerService, featureService, loadingService);
  }

  /**
   * Gets the private logged in user id
   */
   public get userId(): string {
    return this.pUserId;
  }

  /**
   * Gets the caseworker's location
   */
  public get caseworkerLocation(): Location {
    return this.cwLocation;
  }

  private pUserId: string;
  // pCaseworkerLocation is the caseworker that sets the location of the location dropdown
  // Note: Setter for caseworkerLocation may come in useful if the selected location needs to be set via the caseworker assigned to the task
  public cwLocation: Location;

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
    super.setupTaskList();
    // Get the caseworkers and locations for this component.
    this.locationService.getLocations().subscribe(locations => {
      this.locations = [ ...locations ];
    }, error => {
      handleFatalErrors(error.status, this.router);
    });
    this.setupUserId();
    this.setupCaseworkerLocation();
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
   * Sets up the logged in userId
   */
  private setupUserId(): void {
    const userInfoStr = this.sessionStorageService.getItem('userDetails');
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      this.pUserId = userInfo.id;
    }
  }

  /**
   * Using set user id, gets caseworker details for the caseworker which will set the selected location
   * (caseworker for the purpose of selecting location in dropdown currently the logged in user)
   */
   private setupCaseworkerLocation(): void {
    this.caseworkerService.getAll().subscribe(caseworkers => {
      const assignedCaseworker = caseworkers.find(cw => this.isLoggedInUser(cw.idamId));
      this.cwLocation = assignedCaseworker.location ? assignedCaseworker.location : FilterConstants.Options.Locations.ALL;
    }, error => {
      handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
    });
  }

  /**
   * Checks if the current caseworker matches the caseworker that will set the location (logged in user)
   */
  private isLoggedInUser(idamId: string): boolean {
    return idamId === this.pUserId;
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
        values = [this.selectedCaseworker.idamId];
      }
    } else {
      values = [];
    }
    return { key: 'user', operator: 'IN', values };
  }
}
