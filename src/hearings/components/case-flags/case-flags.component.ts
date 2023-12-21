import { Component, Input, OnInit } from '@angular/core';
import { CaseFlagGroup } from '../../models/caseFlagGroup.model';
import { AmendmentLabelStatus } from '../../models/hearingsUpdateMode.enum';
import { HearingsService } from '../../services/hearings.service';

@Component({
  selector: 'exui-case-flags',
  templateUrl: './case-flags.component.html',
  styleUrls: ['./case-flags.component.scss']
})
export class CaseFlagsComponent implements OnInit {
  @Input() public caseFlagsGroup: CaseFlagGroup[];
  @Input() public info: string;

  public reasonableAdjustmentChangesConfirmed: boolean;
  public amendmentLabelEnum = AmendmentLabelStatus;

  constructor(private readonly hearingsService: HearingsService) {}

  public ngOnInit(): void {
    console.log('CASE FLAGS GROUP', this.caseFlagsGroup);
    console.log('PropertiesUpdatedOnPageVisit', this.hearingsService.propertiesUpdatedOnPageVisit);
    this.reasonableAdjustmentChangesConfirmed = this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.reasonableAdjustmentChangesConfirmed;
  }
}
