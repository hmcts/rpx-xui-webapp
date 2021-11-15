import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from '@hmcts/ccd-case-ui-toolkit/dist/shared/services';
import { PersonRole } from '@hmcts/rpx-xui-common-lib';
import { AppUtils } from '../../../app/app-utils';
import { UserInfo, UserRole } from '../../../app/models';
import { RoleCategory } from '../../../role-access/models';
import { OptionsModel } from '../../../role-access/models/options-model';
import { AllocateRoleService } from '../../../role-access/services';

@Component({
  selector: 'exui-task-assignment-choose-role',
  templateUrl: './task-assignment-choose-role.component.html',
  styleUrls: ['./task-assignment-choose-role.component.scss']
})
export class TaskAssignmentChooseRoleComponent implements OnInit {

  private static userDetails: string = 'userDetails';
  public title: string = 'Choose a role type';
  public verb: string = '';
  public caption: string = 'Reassign task';
  public description: string = 'Which role type are you reassigning the task to?';
  public submitted: boolean = true;
  public optionsList: OptionsModel[];
  public roles = TaskAssignmentChooseRoleComponent.getOptions();
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly location: Location,
              private readonly router: Router,
              private readonly allocateRoleService: AllocateRoleService,
              private readonly sessionStorageService: SessionStorageService,
              private readonly route: ActivatedRoute) {
  }

  private static getOptions(): OptionsModel[] {
    return [
      {optionId: RoleCategory.JUDICIAL, optionValue: RoleCategory.JUDICIAL, label: PersonRole.JUDICIAL},
      {optionId: RoleCategory.LEGAL_OPERATIONS, optionValue: RoleCategory.LEGAL_OPERATIONS, label: PersonRole.CASEWORKER}
    ];
  }

  public ngOnInit() {
    const isJudicial = this.isCurrentUserJudicial();
    const taskId = this.route.snapshot.paramMap.get('taskId');
    this.verb = this.route.snapshot.data.verb;
    this.setCaptionAndDescription(this.verb);
    this.form = this.fb.group({
      role: [isJudicial ? RoleCategory.JUDICIAL : RoleCategory.LEGAL_OPERATIONS, Validators.required],
      taskId: [taskId, Validators.required]
    });
  }

  public cancel(): void {
    this.location.back();
  }

  public submit(values: any, valid: boolean): void {
    if (valid) {
      const role = values.role;
      const taskId = values.taskId;
      this.router.navigate(['work', taskId, this.verb.toLowerCase(), 'person'], {queryParams: {role}});
    }
  }

  private setCaptionAndDescription(verb: string): void {
    if (verb === 'Assign') {
      this.caption = 'Assign task';
      this.description = 'Which role type are you assigning the task to?';
    }
  }

  private isCurrentUserJudicial(): boolean {
    const userInfoStr = this.sessionStorageService.getItem(TaskAssignmentChooseRoleComponent.userDetails);
    if (userInfoStr) {
      const userInfo: UserInfo = JSON.parse(userInfoStr);
      return AppUtils.isLegalOpsOrJudicial(userInfo.roles) === UserRole.Judicial;
    }
    return false;
  }
}
