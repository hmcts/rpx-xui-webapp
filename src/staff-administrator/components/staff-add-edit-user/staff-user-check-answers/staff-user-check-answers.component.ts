import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FilterService
} from '@hmcts/rpx-xui-common-lib';
@Component({
  selector: 'exui-staff-user-check-answers',
  templateUrl: './staff-user-check-answers.component.html',
  styleUrls: ['./staff-user-check-answers.component.scss']
})
export class StaffUserCheckAnswersComponent implements OnInit {
  private formId: string = 'staff-add-edit-user';

  constructor(private filterService: FilterService,
              private router: Router) { }

  public ngOnInit() {
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
