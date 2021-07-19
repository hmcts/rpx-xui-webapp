import { Component, Input, OnInit } from '@angular/core';

import { RoleAllocationCaptionText, RoleAllocationRadioText, RoleAllocationTitleText, RoleAllocationType } from '../../../cases/enums';

@Component({
  selector: 'exui-choose-role',
  templateUrl: './choose-role.component.html'
})

export class ChooseRoleComponent implements OnInit {

  @Input() public roleAllocation: RoleAllocationType;
  @Input() public includeOther: boolean;
  @Input() public roles: string[];

  public title = RoleAllocationTitleText.NonExclusionChoose;
  public caption: RoleAllocationCaptionText;

  constructor() {}

  public ngOnInit(): void {
    this.setChoosePage();
  }

  private setChoosePage(): void {
    switch (this.roleAllocation) {
      case RoleAllocationType.Exclusion: {
        this.title = RoleAllocationTitleText.ExclusionChoose;
        this.caption = RoleAllocationCaptionText.Exclusion;
        this.roles = ['Judicial', 'Legal ops', 'Admin'];
        break;
      }
      case RoleAllocationType.Judiciary: {
        this.caption = RoleAllocationCaptionText.JudiciaryChoose;
        this.roles = ['Lead judge', 'Hearing judge'];
        break;
      }
      case RoleAllocationType.LegalOps: {
        this.caption = RoleAllocationCaptionText.LegalOpsChoose;
        this.roles = ['Case manager'];
        break;
      }
      default: {
        break;
      }
    }
  }
}
