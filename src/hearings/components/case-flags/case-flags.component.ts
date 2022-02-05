import {Component, Input, OnInit} from '@angular/core';
import {CaseFlagGroup} from '../../models/caseFlagGroup.model';
import {CaseFlagReferenceModel} from '../../models/caseFlagReference.model';
import {CaseFlagType} from '../../models/hearings.enum';
import {ServiceHearingValuesModel} from '../../models/serviceHearingValues.model';
import {CaseFlagsUtils} from '../../utils/case-flags.utils';

@Component({
  selector: 'exui-case-flags',
  templateUrl: './case-flags.component.html',
  styleUrls: ['./case-flags.component.scss']
})
export class CaseFlagsComponent implements OnInit {
  public caseFlagsGroup: CaseFlagGroup[];

  @Input() public info: string;
  @Input() public hearingValueModel: ServiceHearingValuesModel;
  @Input() public caseFlagsRefData: CaseFlagReferenceModel[];
  @Input() public caseFlagType: CaseFlagType;

  public ngOnInit(): void {
    if (this.hearingValueModel && this.hearingValueModel.caseFlags) {
      this.caseFlagsGroup = CaseFlagsUtils.displayCaseFlagsGroup(this.hearingValueModel.caseFlags.flags, this.caseFlagsRefData, this.caseFlagType);
    }
  }

}
