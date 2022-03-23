import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActualDayPartyModel, ActualHearingDayModel, HearingActualsMainModel, PauseDateTimeModel } from '../../models/hearingActualsMainModel';
import { HearingActualsStateData } from '../../models/hearingActualsStateData.model';
import { HearingDateEnum } from '../../models/hearings.enum';
import { LovRefDataModel } from '../../models/lovRefData.model';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-hearing-actual-summary',
  templateUrl: './hearing-actual-summary.component.html',
  styleUrls: ['./hearing-actual-summary.component.scss']
})
export class HearingActualSummaryComponent implements OnInit, OnDestroy {
  public dateFormat = HearingDateEnum;
  public hearingActualsMainModel: HearingActualsMainModel;
  public actualPauseTime: PauseDateTimeModel;
  public actualHearingDays: ActualHearingDayModel = {} as ActualHearingDayModel;
  public participants: ActualDayPartyModel[] = [];
  public attendies: ActualDayPartyModel[] = [];
  public partyChannels: LovRefDataModel[] = [];
  public sub: Subscription;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly route: ActivatedRoute) {
    this.partyChannels = this.route.snapshot.data.partyChannels;
  }

  public ngOnInit(): void {
    this.sub = this.hearingStore.select(fromHearingStore.getHearingActuals)
      .pipe(
        filter((state: HearingActualsStateData) => !!state.hearingActualsMainModel),
      )
      .subscribe((state: HearingActualsStateData) => {
        this.hearingActualsMainModel = state.hearingActualsMainModel;
        this.actualHearingDays = state.hearingActualsMainModel.hearingActuals.actualHearingDays[0];
        this.actualPauseTime = this.actualHearingDays.pauseDateTimes[0];
        this.setPartyData();
      });
  }

  public setPartyData() {
    const plannedParties = this.hearingActualsMainModel.hearingPlanned.plannedHearingDays[0].parties;
    const actualParties = this.actualHearingDays.actualDayParties;
    actualParties.forEach((actualPartyInfo) => {
      const plannedPartyInfo = plannedParties.find((plannedParty) => plannedParty.partyId === actualPartyInfo.actualPartyId);
      if (plannedPartyInfo) {
        const partyDetail: ActualDayPartyModel = {
          actualIndividualDetails: {
            firstName: plannedPartyInfo.individualDetails.firstName,
            lastName: plannedPartyInfo.individualDetails.lastName,
          },
          actualOrganisationDetails: {
            name: plannedPartyInfo.organisationDetails.name,
          },
          didNotAttendFlag: false,
          partyChannelSubType: plannedPartyInfo.partyChannelSubType,
          representedParty: null,
          actualPartyId: plannedPartyInfo.partyId,
          partyRole: plannedPartyInfo.partyRole,
        };
        const { channel, subChannel } = this.getChannelInfo(actualPartyInfo.partyChannelSubType);
        partyDetail['channel'] = channel;
        partyDetail['subChannel'] = subChannel;
        this.participants.push(partyDetail);
      } else {
        const partyDetail: ActualDayPartyModel = { ...actualPartyInfo };
        const reprentedPartyDetails = plannedParties.find((plannedParty) => plannedParty.partyId === actualPartyInfo.representedParty).individualDetails;
        if (reprentedPartyDetails) {
          const partyName = `${reprentedPartyDetails.firstName} ${reprentedPartyDetails.lastName}`;
          partyDetail['reprentedPartyDetails'] = partyName;
        }
        const { channel, subChannel } = this.getChannelInfo(actualPartyInfo.partyChannelSubType);
        partyDetail['channel'] = channel;
        partyDetail['subChannel'] = subChannel;
        this.attendies.push(partyDetail);
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

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
