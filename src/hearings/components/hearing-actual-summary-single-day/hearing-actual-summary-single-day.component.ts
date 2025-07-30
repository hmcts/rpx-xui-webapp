import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActualHearingDayModel, HearingActualsMainModel } from '../../models/hearingActualsMainModel';
import { HearingDateEnum } from '../../models/hearings.enum';
import { LovRefDataModel } from '../../models/lovRefData.model';
import { ActualHearingsUtils } from '../../utils/actual-hearings.utils';

@Component({
    selector: 'exui-hearing-actual-summary-single-day',
    templateUrl: './hearing-actual-summary-single-day.component.html',
    styleUrls: ['./hearing-actual-summary-single-day.component.scss'],
    standalone: false
})
export class HearingActualSummarySingleDayComponent {
  @Input() public hearingActualsMainModel: HearingActualsMainModel;
  @Input() public isPaperHearing: boolean;
  @Input() public hearingDate: string;

  public get actualHearingDay(): ActualHearingDayModel {
    const index = ActualHearingsUtils.getActualDayIndexFromHearingDate(this.hearingActualsMainModel, this.hearingDate);
    return index >= 0 ? this.hearingActualsMainModel.hearingActuals.actualHearingDays[index] : undefined;
  }

  public dateFormat = HearingDateEnum;
  public partyChannels: LovRefDataModel[] = [];
  public hearingRoles: LovRefDataModel[] = [];
  public ActualHearingsUtils = ActualHearingsUtils;

  constructor(private readonly route: ActivatedRoute) {
    this.partyChannels = [...this.route.snapshot.data.partyChannels, ...this.route.snapshot.data.partySubChannels];
    this.hearingRoles = this.route.snapshot.data.hearingRoles;
  }
}
