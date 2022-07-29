import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ActualDayPartyModel,
  ActualHearingDayModel,
  PlannedHearingDayModel
} from '../../models/hearingActualsMainModel';
import { HearingDateEnum } from '../../models/hearings.enum';
import { LovRefDataModel } from '../../models/lovRefData.model';

@Component({
  selector: 'exui-hearing-actual-summary-single-day',
  templateUrl: './hearing-actual-summary-single-day.component.html',
  styleUrls: ['./hearing-actual-summary-single-day.component.scss']
})
export class HearingActualSummarySingleDayComponent implements OnInit {
  @Input() public plannedHearingDay: PlannedHearingDayModel = {} as PlannedHearingDayModel;
  @Input() public actualHearingDay: ActualHearingDayModel = {} as ActualHearingDayModel;
  public dateFormat = HearingDateEnum;
  public participants: ActualDayPartyModel[] = [];
  public attendees: ActualDayPartyModel[] = [];
  public partyChannels: LovRefDataModel[] = [];
  public hearingRoles: LovRefDataModel[] = [];

  constructor(private readonly route: ActivatedRoute) {
    this.partyChannels = this.route.snapshot.data.partyChannels;
    this.hearingRoles = this.route.snapshot.data.hearingRoles;
  }

  public ngOnInit() {
    this.setPartyData();
  }

  public setPartyData() {
    const plannedParties = this.plannedHearingDay.parties;
    const actualParties = this.actualHearingDay.actualDayParties;
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
        this.participants.push(partyDetail);
      } else {
        const partyDetail: ActualDayPartyModel = { ...actualPartyInfo };
        const representedPartyDetails = plannedParties.find((plannedParty) => plannedParty.partyID === actualPartyInfo.representedParty).individualDetails;
        if (representedPartyDetails) {
          partyDetail['representedPartyDetails'] = `${representedPartyDetails.firstName} ${representedPartyDetails.lastName}`;
        }

        this.attendees.push(partyDetail);
      }
    });
  }

  public getChannelInfo(channelType: string): { channel: string; subChannel: string; } {
    let channelInfo: { channel: string; subChannel: string; };
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
