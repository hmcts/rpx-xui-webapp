import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActualDayPartyModel, ActualHearingDayModel, HearingActualsMainModel, PauseDateTimeModel } from '../../models/hearingActualsMainModel';
import { HearingDateEnum, HearingResult } from '../../models/hearings.enum';
import { LovRefDataModel } from '../../models/lovRefData.model';

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
  public attendies: ActualDayPartyModel[] = [];
  public partyChannels: LovRefDataModel[] = [];
  public isCompleted: boolean;
  public isAdjourned: boolean;

  constructor(private readonly route: ActivatedRoute) {
    this.partyChannels = this.route.snapshot.data.partyChannels;
  }

  public ngOnInit(): void {
    this.isCompleted = this.hearingActualsMainModel.hearingActuals.hearingOutcome.hearingResult === HearingResult.COMPLETED;
    this.isAdjourned = this.hearingActualsMainModel.hearingActuals.hearingOutcome.hearingResult === HearingResult.ADJOURNED;
    this.actualHearingDays = this.hearingActualsMainModel.hearingActuals.actualHearingDays[0];
    this.actualPauseTime = this.actualHearingDays.pauseDateTimes[0];
    this.setPartyData();
  }

  public setPartyData() {
    const plannedParties = this.hearingActualsMainModel.hearingPlanned.plannedHearingDays[0].parties;
    const actualParties = this.actualHearingDays.actualDayParties;
    actualParties.forEach((actualPartyInfo) => {
      const plannedPartyInfo = plannedParties.find((plannedParty) => plannedParty.partyID === actualPartyInfo.actualPartyId);
      if (plannedPartyInfo) {
        const partyDetail: ActualDayPartyModel = {
          individualDetails: {
            firstName: plannedPartyInfo.individualDetails.firstName,
            lastName: plannedPartyInfo.individualDetails.lastName,
          },
          actualOrganisationName: plannedPartyInfo.organisationDetails ? plannedPartyInfo.organisationDetails.name : '',
          didNotAttendFlag: false,
          partyChannelSubType: plannedPartyInfo.partyChannelSubType,
          representedParty: null,
          actualPartyId: plannedPartyInfo.partyID,
          partyRole: plannedPartyInfo.partyRole,
        };
        const { channel, subChannel } = this.getChannelInfo(actualPartyInfo.partyChannelSubType);
        partyDetail['channel'] = channel;
        partyDetail['subChannel'] = subChannel;
        this.participants.push(partyDetail);
      } else {
        const partyDetail: ActualDayPartyModel = { ...actualPartyInfo };
        const reprentedPartyDetails = plannedParties.find((plannedParty) => plannedParty.partyID === actualPartyInfo.representedParty).individualDetails;
        if (reprentedPartyDetails) {
          partyDetail['reprentedPartyDetails'] = `${reprentedPartyDetails.firstName} ${reprentedPartyDetails.lastName}`;
        }
        const { channel, subChannel } = this.getChannelInfo(actualPartyInfo.partyChannelSubType);
        partyDetail['channel'] = channel;
        partyDetail['subChannel'] = subChannel;
        this.attendies.push(partyDetail);
      }
    });
  }

  public getChannelInfo(channelType: string): { channel: string; subChannel: string; } {
    let channelInfo = { channel: '', subChannel: ''};
    this.partyChannels.forEach(channel => {
      if (channel.child_nodes && channel.child_nodes.length) {
        channel.child_nodes.forEach(subChannel => {
          if (channelType === subChannel.key) {
            channelInfo = { channel: channel.value_en, subChannel: subChannel.value_en };
          }
        });
      } else if (channel.key === channelType) {
        channelInfo = { channel: channel.value_en, subChannel: '' };
      }
    });
    return channelInfo;
  }
}
