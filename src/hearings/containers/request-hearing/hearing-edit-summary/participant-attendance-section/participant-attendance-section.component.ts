import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';
import { HearingRequestMainModel } from '../../../../models/hearingRequestMain.model';
import { HearingChannelEnum, PartyType } from '../../../../models/hearings.enum';
import { LovRefDataModel } from '../../../../models/lovRefData.model';
import { PartyDetailsModel } from '../../../../models/partyDetails.model';
import { ServiceHearingValuesModel } from '../../../../models/serviceHearingValues.model';

@Component({
  selector: 'exui-participant-attendance-section',
  templateUrl: './participant-attendance-section.component.html'
})
export class ParticipantAttendanceSectionComponent implements OnInit {
  @Input() public partyChannelsRefData: LovRefDataModel[];
  @Input() public partySubChannelsRefData: LovRefDataModel[];
  @Input() public hearingRequestMainModel: HearingRequestMainModel;
  @Input() public serviceHearingValuesModel: ServiceHearingValuesModel;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public partyChannelsRefDataCombined: LovRefDataModel[] = [];
  public isPaperHearing : string;
  public participantChannels: string[] = [];
  public participantAttendanceModes: string[] = [];
  public numberOfPhysicalAttendees: number;

  public ngOnInit(): void {
    this.partyChannelsRefDataCombined = [...this.partyChannelsRefData, ...this.partySubChannelsRefData];
    this.isPaperHearing = this.getIsPaperHearing();
    this.participantChannels = this.getParticipantChannels();
    this.participantAttendanceModes = this.getParticipantAttendanceModes();
    this.numberOfPhysicalAttendees = this.getNumberOfPhysicalAttendees();
  }

  public onChange(fragmentId: string): void {
    let changeLink = '';
    switch (fragmentId) {
      case 'paperHearing':
        changeLink = '/hearings/request/hearing-attendance#paperHearingYes';
        break;
      case 'howParticipantsAttendant':
        changeLink = '/hearings/request/hearing-attendance#hearingLevelChannelList';
        break;
      case 'howAttendant':
        changeLink = '/hearings/request/hearing-attendance#partyChannel0';
        break;
      case 'attendantPersonAmount':
        changeLink = '/hearings/request/hearing-attendance#attendance-number';
        break;
    }
    this.changeEditHearing.emit({ fragmentId, changeLink });
  }

  private getIsPaperHearing(): string {
    return this.hearingRequestMainModel.hearingDetails?.hearingChannels?.includes(HearingChannelEnum.ONPPR)
      ? 'Yes'
      : 'No';
  }

  private getParticipantChannels(): string[] {
    const participantChannels: string[] = [];
    this.hearingRequestMainModel.hearingDetails?.hearingChannels?.forEach((hearingChannel) => {
      const partyChannelFromRefData = this.partyChannelsRefDataCombined.find((partyChannel) => partyChannel.key === hearingChannel);
      if (partyChannelFromRefData) {
        participantChannels.push(partyChannelFromRefData.value_en);
      }
    });
    return participantChannels;
  }

  private getParticipantAttendanceModes(): string[] {
    const participantAttendanceModes: string[] = [];
    const individualPartiesFromRequest = this.hearingRequestMainModel.partyDetails?.filter((partyFromRequest) => partyFromRequest.partyType === PartyType.IND);
    const partiesFromServiceValue = this.serviceHearingValuesModel.parties;
    individualPartiesFromRequest.forEach((individualParty: PartyDetailsModel) => {
      const foundPartyFromService = partiesFromServiceValue.find((partyFromService) => partyFromService.partyID === individualParty.partyID);
      const name = this.getPartyName(individualParty, foundPartyFromService);
      const value = this.getPartyChannelValue(individualParty);
      participantAttendanceModes.push(`${name} - ${value}`);
    });
    return participantAttendanceModes;
  }

  private getPartyName(individualParty: PartyDetailsModel, foundPartyFromService: PartyDetailsModel): string {
    if (individualParty.partyName) {
      return individualParty.partyName;
    }
    if (foundPartyFromService) {
      if (foundPartyFromService.partyName && foundPartyFromService.partyName !== null) {
        return foundPartyFromService.partyName;
      }
      return foundPartyFromService.partyID;
    }
    return '';
  }

  private getPartyChannelValue(individualParty: PartyDetailsModel): string {
    let preferredHearingChannelRefData = null;
    if (individualParty.individualDetails) {
      preferredHearingChannelRefData = this.partyChannelsRefDataCombined.find((ref) => ref.key === individualParty.individualDetails?.preferredHearingChannel);
    }
    return preferredHearingChannelRefData?.value_en || '';
  }

  private getNumberOfPhysicalAttendees(): number {
    return this.hearingRequestMainModel.hearingDetails?.numberOfPhysicalAttendees || 0;
  }
}
