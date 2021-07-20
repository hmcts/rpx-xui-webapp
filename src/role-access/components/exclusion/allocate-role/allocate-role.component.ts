import { Component, Input, OnInit } from '@angular/core';

import { RoleAllocationCaptionText, RoleAllocationRadioText, RoleAllocationTitleText, RoleAllocationType } from '../../../models/enums';

@Component({
  selector: 'exui-allocate-role',
  templateUrl: './allocate-role.component.html'
})

export class AllocateRoleComponent implements OnInit {

  @Input() public roleAllocation: RoleAllocationType;
  @Input() public includeOther: boolean;

  public title = RoleAllocationTitleText.NonExclusion;
  public caption: RoleAllocationCaptionText;
  public selfText = RoleAllocationRadioText.NonExclusionSelf;
  public otherText = RoleAllocationRadioText.NonExclusionOther;

  constructor() {}

  public ngOnInit(): void {
    this.setAllocationPage();
  }

  private setAllocationPage(): void {
    switch (this.roleAllocation) {
      case RoleAllocationType.Exclusion: {
        this.title = RoleAllocationTitleText.Exclusion;
        this.caption = RoleAllocationCaptionText.Exclusion;
        this.selfText = RoleAllocationRadioText.ExclusionSelf;
        this.otherText = RoleAllocationRadioText.ExclusionOther;
        break;
      }
      case RoleAllocationType.Judiciary: {
        this.caption = RoleAllocationCaptionText.Judiciary;
        break;
      }
      case RoleAllocationType.LegalOps: {
        this.caption = RoleAllocationCaptionText.LegalOps;
        break;
      }
      default: {
        break;
      }
    }
  }
}
