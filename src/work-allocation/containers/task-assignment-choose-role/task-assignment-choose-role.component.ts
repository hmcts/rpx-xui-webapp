import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { SessionStorageService } from '../../../app/services';
import { OptionsModel } from '../../../role-access/models/options-model';
import { getCurrentUserRoleCategories, getOptions } from '../../../work-allocation/utils';
import { TaskPermission, TaskRole } from '../../models/tasks';

@Component({
  standalone: false,
  selector: 'exui-task-assignment-choose-role',
  templateUrl: './task-assignment-choose-role.component.html',
  styleUrls: ['./task-assignment-choose-role.component.scss'],
})
export class TaskAssignmentChooseRoleComponent implements OnInit {
  private static readonly userDetails: string = 'userDetails';
  public title: string = 'Choose a role type';
  public verb: string = '';
  public caption: string = 'Reassign task';
  public description: string = 'Which role type are you reassigning the task to?';
  public submitted: boolean = true;
  public taskRoles: TaskRole[] = [];
  public service: string;
  public form: FormGroup;
  public roles: OptionsModel[];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly sessionStorageService: SessionStorageService,
    private readonly route: ActivatedRoute,
    private readonly location: Location
  ) {}

  private get returnUrl(): string {
    // Default URL is '' because this is the only sensible return navigation if the user has used browser navigation
    // buttons, which clear the state object
    let url: string = '';
    const state = this.location.getState() as { returnUrl?: string } | null;

    // The returnUrl is undefined if the user has used browser navigation buttons, so check for its presence
    if (state?.returnUrl) {
      // Truncate any portion of the URL beginning with '#', as is appended when clicking "Manage" on a task
      url = state.returnUrl.split('#')[0];
    }

    return url;
  }

  public ngOnInit(): void {
    this.taskRoles = this.route.snapshot.data.roles;
    this.roles = this.taskRoles ? getOptions(this.taskRoles, this.sessionStorageService) : [];
    const taskId = this.route.snapshot.paramMap.get('taskId');
    this.service = this.route.snapshot.queryParamMap.get('service');
    this.verb = this.route.snapshot.data.verb;
    this.setCaptionAndDescription(this.verb);
    this.form = this.fb.group({
      role: [
        this.setUpDefaultRoleType(getCurrentUserRoleCategories(this.sessionStorageService), this.taskRoles),
        Validators.required,
      ],
      taskId: [taskId, Validators.required],
    });
  }

  public cancel(): void {
    this.router.navigate([this.returnUrl]);
  }

  public submit(values: any, valid: boolean): void {
    if (valid) {
      const role = values.role;
      const taskId = values.taskId;
      const state = this.location.getState();
      this.router.navigate(['work', taskId, this.verb.toLowerCase(), 'person'], {
        queryParams: { role, service: this.service },
        state,
      });
    }
  }

  private setCaptionAndDescription(verb: string): void {
    if (verb === 'Assign') {
      this.caption = 'Assign task';
      this.description = 'Which role type are you assigning the task to?';
    }
  }

  private setUpDefaultRoleType(userRoleCategories: RoleCategory[], roles: TaskRole[]): string {
    const roleCategory = this.route.snapshot.queryParamMap.get('roleCategory');
    if (roleCategory && (roleCategory as RoleCategory) !== null) {
      return roleCategory as RoleCategory;
    } else if (roles.length > 0) {
      const roleCategories = this.taskWithOwnPermission(roles);
      // if there is only one role with relevant permissions, use that role
      if (roleCategories?.length === 1) {
        return roleCategories[0].toUpperCase();
        // if the user has a role that matches the relevant task role category
      } else if (roleCategories.some((role) => userRoleCategories.includes(role as RoleCategory))) {
        return userRoleCategories.find((role) => roleCategories.includes(role as RoleCategory)) as string;
        // else return simply the first (found) role with an own permission
      }

      return roleCategories[0];
    }
    return RoleCategory.ALL;
  }

  private taskWithOwnPermission(roles: TaskRole[]): string[] {
    // EUI-5236 - TaskPermission instead of Permission (i.e. not all caps)
    const possibleRoles = roles.filter((role) => role.permissions.includes(TaskPermission.OWN));
    const roleList = [];
    possibleRoles.forEach((possibleRole) => {
      if (!roleList.includes(possibleRole.role_category)) {
        roleList.push(possibleRole.role_category.toUpperCase());
      }
    });
    return roleList;
  }
}
