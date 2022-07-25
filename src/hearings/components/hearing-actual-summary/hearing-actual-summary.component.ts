import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  ActualDayPartyModel,
  ActualHearingDayModel,
  HearingActualsMainModel,
  PauseDateTimeModel
} from '../../models/hearingActualsMainModel';
import {HearingDateEnum, HearingResult} from '../../models/hearings.enum';
import {LovRefDataModel} from '../../models/lovRefData.model';
import {HearingsUtils} from '../../utils/hearings.utils';

@Component({
  selector: 'exui-hearing-actual-summary',
  templateUrl: './hearing-actual-summary.component.html',
  styleUrls: ['./hearing-actual-summary.component.scss']
})
export class HearingActualSummaryComponent implements OnInit {
  @Input() public hearingActualsMainModel: HearingActualsMainModel;
  public dateFormat = HearingDateEnum;
  public actualPauseTime: PauseDateTimeModel;
  public actualHearingDays: ActualHearingDayModel = {} as ActualHearingDayModel;
  public participants: ActualDayPartyModel[] = [];
  public attendees: ActualDayPartyModel[] = [];
  public partyChannels: LovRefDataModel[] = [];
  public hearingRoles: LovRefDataModel[] = [];
  public hearingStageOptions: LovRefDataModel[] = [];
  public adjournReasons: LovRefDataModel[] = [];
  public isCompleted: boolean;
  public isAdjourned: boolean;

  constructor(private readonly route: ActivatedRoute) {
    this.partyChannels = this.route.snapshot.data.partyChannels;
    this.hearingRoles = this.route.snapshot.data.hearingRoles;
    this.hearingStageOptions = this.route.snapshot.data.hearingStageOptions;
    this.adjournReasons = this.route.snapshot.data.adjournReasons;
  }

  public ngOnInit(): void {
    this.isCompleted = this.hearingActualsMainModel.hearingActuals.hearingOutcome.hearingResult === HearingResult.COMPLETED;
    this.isAdjourned = this.hearingActualsMainModel.hearingActuals.hearingOutcome.hearingResult === HearingResult.ADJOURNED;
    this.actualHearingDays = this.hearingActualsMainModel.hearingActuals.actualHearingDays[0];
    this.actualPauseTime = this.actualHearingDays.pauseDateTimes[0];
    this.setPartyData();
  }

  public setPartyData(): void {
    const plannedParties = this.hearingActualsMainModel.hearingPlanned.plannedHearingDays[0].parties;
    const actualParties = this.actualHearingDays.actualDayParties;
    actualParties.forEach((actualPartyInfo) => {
      const plannedPartyInfo = plannedParties.find((plannedParty) => plannedParty.partyID === actualPartyInfo.actualPartyId);
      // if that is in planned party that will be put in participants
      if (plannedPartyInfo) {
        const partyDetail: ActualDayPartyModel = {
          individualDetails: {
            firstName: actualPartyInfo.individualDetails.firstName,
            lastName: actualPartyInfo.individualDetails.lastName,
          },
          actualOrganisationName: actualPartyInfo.actualOrganisationName || '',
          didNotAttendFlag: false,
          partyChannelSubType: HearingsUtils.getValue(actualPartyInfo.partyChannelSubType, this.partyChannels),
          representedParty: null,
          actualPartyId: actualPartyInfo.actualPartyId,
          partyRole: this.getRoleInfo(actualPartyInfo.partyRole),
        };
        this.participants.push(partyDetail);
      // if that is not in planned party that will be put in attendees
      } else {
        const representedPartyDetails = plannedParties.find((plannedParty) => plannedParty.partyID === actualPartyInfo.representedParty).individualDetails;
        const partyDetail: ActualDayPartyModel = {
          ...actualPartyInfo,
          partyChannelSubType: HearingsUtils.getValue(actualPartyInfo.partyChannelSubType, this.partyChannels),
          representedParty: `${representedPartyDetails.firstName} ${representedPartyDetails.lastName}`,
          partyRole: this.getRoleInfo(actualPartyInfo.partyRole),
        };
        this.attendees.push(partyDetail);
      }
    });
  }

  public getRoleInfo(roleKey: string): string {
    const foundRole = this.hearingRoles.find(role => role.key === roleKey);
    return foundRole ? foundRole.value_en : roleKey;
  }
}
