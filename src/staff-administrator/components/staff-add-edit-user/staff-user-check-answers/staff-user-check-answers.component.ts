import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FilterService, GroupOptions
} from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs/operators';
import { InfoMessage } from '../../../../app/shared/enums/info-message';
import { InformationMessage } from '../../../../app/shared/models';
import { InfoMessageCommService } from '../../../../app/shared/services/info-message-comms.service';
import * as fromAppStore from '../../../../app/store';
import { InfoMessageType } from '../../../../role-access/models/enums';
import { StaffAddEditUserFormId } from '../../../models/staff-add-edit-user-form-id.enum';
import { StaffFilterOption } from '../../../models/staff-filter-option.model';
import { StaffUser } from '../../../models/staff-user.model';
import { StaffAddEditFormService } from '../../../services/staff-add-edit-form.service/staff-add-edit-form.service';
import { StaffDataAccessService } from '../../../services/staff-data-access/staff-data-access.service';

@Component({
  selector: 'exui-staff-user-check-answers',
  templateUrl: './staff-user-check-answers.component.html',
  styleUrls: ['./staff-user-check-answers.component.scss']
})

export class StaffUserCheckAnswersComponent implements OnInit {
  public formId: string;
  public staffUser: StaffUser;
  public staffFilterOptions: {
    userTypes: StaffFilterOption[],
    jobTitles: StaffFilterOption[],
    skills: GroupOptions[],
    services: StaffFilterOption[]
  };
  public isLoading = false;
  public isUpdateMode = false;

  constructor(
    private readonly appStore: Store<fromAppStore.State>,
    private filterService: FilterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private staffDataAccessService: StaffDataAccessService,
    private readonly messageService: InfoMessageCommService,
    private readonly staffAddEditFormService: StaffAddEditFormService
  ) {
    this.staffUser = staffAddEditFormService.valuesAsStaffUser;
  }


  public ngOnInit() {
    this.staffFilterOptions = {
      userTypes: this.activatedRoute.snapshot.data.userTypes,
      jobTitles: this.activatedRoute.snapshot.data.jobTitles,
      skills: this.activatedRoute.snapshot.data.skills,
      services: this.activatedRoute.snapshot.data.services
    };
    this.isUpdateMode = this.formId === StaffAddEditUserFormId.UpdateUser;


    this.formId = this.activatedRoute.snapshot.data.formId;
  }

  public onSubmit() {
    if (this.isUpdateMode) {
      this.onSubmitUpdateUser();
    } else {
      this.onSubmitAddUser();
    }
  }

  public onSubmitAddUser() {
    this.staffDataAccessService.addNewUser(this.staffUser).subscribe(() => {
      // success banner
      this.messageService.nextMessage({
        message: InfoMessage.ADD_NEW_USER,
        type: InfoMessageType.SUCCESS
      } as InformationMessage);
      this.filterService.clearSessionAndLocalPersistance(this.formId);
      this.router.navigateByUrl('/staff');
    }, () => {
      this.router.navigateByUrl('/service-down');
    });
  }

  public onSubmitUpdateUser() {
    this.isLoading = true;
    this.staffDataAccessService.updateUser(this.staffUser)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe((response) => {
        this.router.navigateByUrl(`/staff/user-details/${response.case_worker_id}`);
      }, (error) => {
        window.scrollTo(0, 0);
        this.router.navigateByUrl('/service-down');
      });
  }

  public cancel() {
    this.resetForm();
    this.router.navigateByUrl('/staff');
  }

  private resetForm(): void {
    this.filterService.clearSessionAndLocalPersistance(this.formId);
    this.filterService.givenErrors.next(null);
  }
}
