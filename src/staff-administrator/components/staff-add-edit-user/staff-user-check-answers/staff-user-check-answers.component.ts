import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FilterService, GroupOptions
} from '@hmcts/rpx-xui-common-lib';
import { take } from 'rxjs/operators';
import { StaffFilterOption } from '../../../models/staff-filter-option.model';
import { StaffUser } from '../../../models/staff-user.model';
import { StaffDataAccessService } from '../../../services/staff-data-access/staff-data-access.service';
import { InfoMessage } from '../../../../app/shared/enums/info-message';
import { InformationMessage } from '../../../../app/shared/models';
import { InfoMessageCommService } from '../../../../app/shared/services/info-message-comms.service';
import { InfoMessageType } from '../../../../role-access/models/enums';

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

  constructor(
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
    this.filterService.getStream(this.formId)
      .pipe(take(1))
      .subscribe(data => {
      if (data.fields) {
        this.staffUser = new StaffUser();
        this.staffUser.initFromGenericFilter(data, this.staffFilterOptions);
      }
    });
  }

  public onSubmit() {
    this.staffDataAccessService.addNewUser(this.staffUser).subscribe(res => {
      // success banner
    }, error => {
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
