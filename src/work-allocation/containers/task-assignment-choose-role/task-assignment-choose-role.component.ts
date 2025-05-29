import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from '@hmcts/ccd-case-ui-toolkit';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { UserInfo } from '../../../app/models';
import { OptionsModel } from '../../../role-access/models/options-model';
import { getOptions } from '../../../work-allocation/utils';
import { TaskPermission, TaskRole } from '../../models/tasks';

@Component({
  selector: 'exui-task-assignment-choose-role',
  templateUrl: './task-assignment-choose-role.component.html',
  styleUrls: ['./task-assignment-choose-role.component.scss']
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

  constructor(private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly sessionStorageService: SessionStorageService,
              private readonly route: ActivatedRoute) {}

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

  public ngOnInit(): void {
    this.taskRoles = this.route.snapshot.data.roles;
    this.roles = getOptions(this.taskRoles, this.sessionStorageService);
    const taskId = this.route.snapshot.paramMap.get('taskId');
    this.service = this.route.snapshot.queryParamMap.get('service');
    this.verb = this.route.snapshot.data.verb;
    this.setCaptionAndDescription(this.verb);
    this.form = this.fb.group({
      role: [this.setUpDefaultRoleType(this.getCurrentUserRoleCategory(), this.taskRoles), Validators.required],
      taskId: [taskId, Validators.required]
    });
  }

  public cancel(): void {
    this.router.navigate([this.returnUrl]);
  }

  public submit(values: any, valid: boolean): void {
    if (valid) {
      const role = values.role;
      const taskId = values.taskId;
      const state = window.history.state;
      this.router.navigate(['work', taskId, this.verb.toLowerCase(), 'person'], { queryParams: { role, service: this.service }, state });
    }
  }

  private setCaptionAndDescription(verb: string): void {
    if (verb === 'Assign') {
      this.caption = 'Assign task';
      this.description = 'Which role type are you assigning the task to?';
    }
  }

  private getCurrentUserRoleCategory(): RoleCategory {
    const userInfoStr = this.sessionStorageService.getItem(TaskAssignmentChooseRoleComponent.userDetails);
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      return userInfo.roleCategory as RoleCategory;
    }
    return null;
  }

  private setUpDefaultRoleType(userRoleCategory: RoleCategory, roles: TaskRole[]): string {
    const roleCategory = this.route.snapshot.queryParamMap.get('roleCategory');
    if (roleCategory && (roleCategory as RoleCategory) !== null) {
      return roleCategory as RoleCategory;
    } else if (roles.length) {
      const roleCategories = this.taskWithOwnPermission(roles);
      // if there is only one role with relevant permissions, use that role
      if (roleCategories && roleCategories.length === 1) {
        return roleCategories[0].toUpperCase();
      // if the user has a role that matches the relevant task role category
      } else if (roleCategories.includes(userRoleCategory)) {
        return userRoleCategory;
      // else return simply the first role with an own permission
      }

      return roleCategories[0];
    }
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
