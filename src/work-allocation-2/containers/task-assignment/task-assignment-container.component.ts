import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorMessage } from '../../../app/models';
import { ConfigConstants } from '../../components/constants';
import { TaskActionType, TaskService, TaskSort } from '../../enums';
import { InformationMessage } from '../../models/comms';
import { Caseworker, Location, Person } from '../../models/dtos';
import { TaskFieldConfig, TaskServiceConfig } from '../../models/tasks';
import { InfoMessageCommService, WorkAllocationTaskService } from '../../services';

@Component({
  selector: 'exui-task-container-assignment',
  templateUrl: 'task-assignment-container.component.html'
})
export class TaskAssignmentContainerComponent implements OnInit, OnDestroy {
  public error: ErrorMessage = null;
  public tasks: any[];
  public showManage: boolean = false;
  public caseworker: Caseworker;
  public verb: TaskActionType;
  public location: Location;

  public formGroup: FormGroup;
  public person: Person;
  private assignTask: Subscription;
  public taskId: string;
  public rootPath: string;

  public defaultPerson: string;

  constructor(
    private readonly taskService: WorkAllocationTaskService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly messageService: InfoMessageCommService
  ) { }

  public get fields(): TaskFieldConfig[] {
    return this.showAssigneeColumn ? ConfigConstants.TaskActionsWithAssignee : ConfigConstants.TaskActions;
  }

  private get returnUrl(): string {
    let url: string = '/mywork/list';

    if (window && window.history && window.history.state) {
      url = window.history.state.returnUrl;
    }

    return url;
  }

  private get showAssigneeColumn(): boolean {
    if (window && window.history && window.history.state) {
      return !!window.history.state.showAssigneeColumn;
    }
    return false;
  }

  public taskServiceConfig: TaskServiceConfig = {
    service: TaskService.IAC,
    defaultSortDirection: TaskSort.ASC,
    defaultSortFieldName: 'dueDate',
    fields: this.fields,
  };

  public ngOnInit(): void {
    // Get the task from the route, which will have been put there by the resolver.
    const task = this.route.snapshot.data.taskAndCaseworkers.data;
    this.tasks = [task];
    this.verb = this.route.snapshot.data.verb as TaskActionType;

    this.taskId = this.route.snapshot.params['taskId'];
    this.rootPath = this.router.url.split('/')[1];
    this.route.paramMap
      .pipe(map(() => window.history.state)).subscribe(person => {
      if (person.name) {
        this.defaultPerson = `${person.name}(${person.email})`;
        this.person = person;
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.assignTask) {
      this.assignTask.unsubscribe();
    }
  }

  public selectedPerson(person?: Person) {
    this.person = person;
  }

  public assign(): void {
    this.router.navigate([this.rootPath, this.taskId, 'reassign', 'confirm'], {state: this.person});
  }

  public cancel(): void {
    this.returnWithMessage(null, {});
  }

  public onCaseworkerChanged(caseworker: Caseworker): void {
    this.caseworker = caseworker;
  }

  private returnWithMessage(message: InformationMessage, state: any): void {
    if (message) {
      this.messageService.nextMessage(message);
    }
    this.router.navigateByUrl(this.returnUrl, {state: {...state, retainMessages: true}});
  }
}
