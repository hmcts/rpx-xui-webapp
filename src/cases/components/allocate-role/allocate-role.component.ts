import { Component, Input, OnInit } from '@angular/core';
import { AllocationCaptionText, AllocationRadioText, AllocationTitleText, AllocationType } from '../../../cases/enums';

@Component({
  selector: 'exui-allocate-role',
  templateUrl: './allocate-role.component.html',
  styleUrls: ['./allocate-role.component.scss']
})

export class AllocateRoleComponent implements OnInit {

  @Input() public allocation: AllocationType;
  @Input() public includeOther: boolean;

  public title: AllocationTitleText;
  public caption: AllocationCaptionText;
  public selfText = AllocationRadioText.NonExclusionSelf;
  public otherText = AllocationRadioText.NonExclusionOther;

  constructor() {}

  public ngOnInit(): void {
    this.setAllocationPage();
  }

  private setAllocationPage(): void {
    switch (this.allocation) {
      case AllocationType.Exclusion: {
        this.title = AllocationTitleText.Exclusion;
        this.caption = AllocationCaptionText.Exclusion;
        this.selfText = AllocationRadioText.ExclusionSelf;
        this.otherText = AllocationRadioText.ExclusionOther;
        break;
      }
      case AllocationType.Judiciary: {
        this.title = AllocationTitleText.Judiciary;
        this.caption = AllocationCaptionText.Judiciary;
        break;
      }
      case AllocationType.LegalOps: {
        this.title = AllocationTitleText.LegalOps;
        this.caption = AllocationCaptionText.LegalOps;
        break;
      }
      default: {
        break;
      }
    }
  }
}
