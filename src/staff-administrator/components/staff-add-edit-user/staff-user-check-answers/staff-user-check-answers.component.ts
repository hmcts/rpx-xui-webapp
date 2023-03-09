import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FilterService, GroupOptions
} from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserDetails } from '../../../../app/models/user-details.model';
import { InfoMessage } from '../../../../app/shared/enums/info-message';
import { InformationMessage } from '../../../../app/shared/models';
import { InfoMessageCommService } from '../../../../app/shared/services/info-message-comms.service';
import * as fromAppStore from '../../../../app/store';
import { InfoMessageType } from '../../../../role-access/models/enums';
import { StaffFilterOption } from '../../../models/staff-filter-option.model';
import { StaffUser } from '../../../models/staff-user.model';
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
  public userDetails$: Observable<UserDetails>;
  public idamRoles = [];

  constructor(
    private readonly appStore: Store<fromAppStore.State>,
    private filterService: FilterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private staffDataAccessService: StaffDataAccessService,
    private readonly messageService: InfoMessageCommService,
  ) {
    this.formId = activatedRoute.snapshot.data.formId;

    this.staffFilterOptions = {
      userTypes: this.activatedRoute.snapshot.data.userTypes,
      jobTitles: this.activatedRoute.snapshot.data.jobTitles,
      skills: this.activatedRoute.snapshot.data.skills,
      services: this.activatedRoute.snapshot.data.services
    };
  }

  public ngOnInit() {
    this.userDetails$ = this.appStore.pipe(select(fromAppStore.getUserDetails));
    this.userDetails$.pipe(
      map(details => {
        this.idamRoles = details.userInfo.roles;
      }));
    this.filterService.getStream(this.formId)
      .pipe(take(1))
      .subscribe(data => {
      if (data.fields) {
        this.staffUser = new StaffUser();
        this.staffUser.fromGenericFilter(data, this.staffFilterOptions);
      }
    });
  }

  public onSubmit() {
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

  public cancel() {
    this.resetForm();
    this.router.navigateByUrl('/staff');
  }

  private resetForm(): void {
    this.filterService.clearSessionAndLocalPersistance(this.formId);
    this.filterService.givenErrors.next(null);
  }
}
