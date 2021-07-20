import { Component, Input, OnInit } from '@angular/core';

import { RoleAllocationCaptionText, RoleAllocationRadioText, RoleAllocationTitleText, RoleAllocationType } from '../../models/enums';

@Component({
  selector: 'exui-choose-role',
  templateUrl: './choose-role.component.html'
})

export class ChooseRoleComponent implements OnInit {

  @Input() public roleAllocation: RoleAllocationType;
  @Input() public includeOther: boolean;
  // TODO: Need to get this from the node layer
  @Input() public roles: string[] = [];

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
        break;
      }
      case RoleAllocationType.Judiciary: {
        this.caption = RoleAllocationCaptionText.JudiciaryChoose;
        break;
      }
      case RoleAllocationType.LegalOps: {
        this.caption = RoleAllocationCaptionText.LegalOpsChoose;
        break;
      }
      default: {
        break;
      }
    }
  }
}
