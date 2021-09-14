import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person, PersonRole } from '@hmcts/rpx-xui-common-lib';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ErrorMessage } from '../../../app/models';
import { ConfigConstants } from '../../components/constants';
import { SortOrder, TaskActionType, TaskService } from '../../enums';
import { FieldConfig } from '../../models/common'
import { Caseworker, Location } from '../../models/dtos';
import { TaskServiceConfig } from '../../models/tasks';

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

  public domain = PersonRole.ALL;
  public formGroup: FormGroup = new FormGroup({});
  public person: Person;
  private readonly assignTask: Subscription;
  public taskId: string;
  public rootPath: string;

  public defaultPerson: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  public get fields(): FieldConfig[] {
    return this.showAssigneeColumn ? ConfigConstants.TaskActionsWithAssignee : ConfigConstants.TaskActions;
  }

  private get returnUrl(): string {
    // Default URL is '' because this is the only sensible return navigation if the user has used browser navigation
    // buttons, which clear the `window.history.state` object
    let url: string = '';

    // The returnUrl is undefined if the user has used browser navigation buttons, so check for its presence
    if (window && window.history && window.history.state && window.history.state.returnUrl) {
      // Truncate any portion of the URL beginning with '#', as is appended when clicking "Manage" on a task
      url = window.history.state.returnUrl.split('#')[0];
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
    defaultSortDirection: SortOrder.ASC,
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
    if (this.formGroup && this.formGroup.value && this.formGroup.value.findPersonControl) {
      // Pass the returnUrl in the `state` parameter, so it can be used for navigation by the Task Assignment Confirm
      // component
      this.router.navigate([this.rootPath, this.taskId, this.verb.toLowerCase(), 'confirm'],
        {state: {...this.person, returnUrl: this.returnUrl}});
    } else {
      this.formGroup.setErrors({
        invalid: true
      });
    }
  }

  public cancel(): void {
    // Use returnUrl to return the user to the "All work" or "My work" screen, depending on which one they started from
    this.router.navigate([this.returnUrl]);
  }

  public onCaseworkerChanged(caseworker: Caseworker): void {
    this.caseworker = caseworker;
  }

  public setFocusOn(eId: string): void {
    document.getElementById(eId).focus();
  }
}
