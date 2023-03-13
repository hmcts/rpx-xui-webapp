import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '@hmcts/rpx-xui-common-lib';

@Component({
  selector: 'exui-staff-edit-user-container',
  templateUrl: './staff-edit-user-container.component.html',
  styleUrls: ['./staff-edit-user-container.component.scss']
})
export class StaffEditUserContainerComponent {
  public formId = '';
  constructor(
    private readonly filterService: FilterService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.formId = activatedRoute.snapshot.data.formId;
  }
}
