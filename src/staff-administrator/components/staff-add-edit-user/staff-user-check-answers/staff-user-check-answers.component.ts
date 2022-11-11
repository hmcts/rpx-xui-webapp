import { Component, OnInit } from '@angular/core';
import { FilterService } from '@hmcts/rpx-xui-common-lib';

@Component({
  selector: 'exui-staff-user-check-answers',
  templateUrl: './staff-user-check-answers.component.html',
  styleUrls: ['./staff-user-check-answers.component.scss']
})
export class StaffUserCheckAnswersComponent implements OnInit {
  public formId: string = 'staff-add-edit-user';
  public addUserData: {
    name: string;
    value: any[];
  }[];
  constructor(private filterService: FilterService,) { }

  public ngOnInit() {
    this.filterService.getStream(this.formId).subscribe(data => {
      this.addUserData = data.fields;
    });
  }

}
