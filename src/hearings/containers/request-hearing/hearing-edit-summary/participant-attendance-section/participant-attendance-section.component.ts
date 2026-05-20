import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { EditHearingChangeConfig } from '../../../../models/editHearingChangeConfig.model';
import { HearingRequestMainModel } from '../../../../models/hearingRequestMain.model';
import { HearingChannelEnum, PartyType } from '../../../../models/hearings.enum';
import { AmendmentLabelStatus, HearingChannelMode, ParticipantAttendanceMode } from '../../../../models/hearingsUpdateMode.enum';
import { LovRefDataModel } from '../../../../models/lovRefData.model';
import { PartyDetailsModel } from '../../../../models/partyDetails.model';
import { ServiceHearingValuesModel } from '../../../../models/serviceHearingValues.model';
import { HearingsService } from '../../../../services/hearings.service';
import { HearingsUtils } from '../../../../utils/hearings.utils';

@Component({
  standalone: false,
  selector: 'exui-participant-attendance-section',
  templateUrl: './participant-attendance-section.component.html',
  styleUrls: ['./participant-attendance-section.component.scss'],
})
export class ParticipantAttendanceSectionComponent implements OnInit {
  @Input() public partyChannelsRefData: LovRefDataModel[];
  @Input() public partySubChannelsRefData: LovRefDataModel[];
  @Input() public hearingRequestMainModel: HearingRequestMainModel;
  @Input() public hearingRequestToCompareMainModel: HearingRequestMainModel;
  @Input() public serviceHearingValuesModel: ServiceHearingValuesModel;
  @Output() public changeEditHearing = new EventEmitter<EditHearingChangeConfig>();

  public partyChannelsRefDataCombined: LovRefDataModel[] = [];
  public isPaperHearing: string;
  public participantChannels: HearingChannelMode[] = [];
  public participantAttendanceModes: ParticipantAttendanceMode[] = [];
  public numberOfPhysicalAttendees: number;
  public pageTitleDisplayLabel: string;
  public partyDetailsChangesRequired: boolean;
  public partyDetailsChangesConfirmed: boolean;
  public isPaperHearingChanged: boolean;
  public numberOfPhysicalAttendeesChanged: boolean;
  public amendmentLabelEnum = AmendmentLabelStatus;

  constructor(private readonly hearingsService: HearingsService) {}

  public ngOnInit(): void {
    this.partyDetailsChangesRequired =
      this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.participantAttendanceChangesRequired;
    this.partyDetailsChangesConfirmed =
      this.hearingsService.propertiesUpdatedOnPageVisit?.afterPageVisit?.participantAttendanceChangesConfirmed;
    this.partyChannelsRefDataCombined = [...this.partyChannelsRefData, ...this.partySubChannelsRefData];
    this.isPaperHearing = this.getIsPaperHearing();
    this.participantChannels = this.getParticipantChannels();
    this.participantAttendanceModes = this.getParticipantAttendanceModes();
    this.numberOfPhysicalAttendees = this.getNumberOfPhysicalAttendees();

    this.setAmendmentLabels();
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
    return this.hearingRequestMainModel.hearingDetails?.hearingChannels?.includes(HearingChannelEnum.ONPPR) ||
      !!this.hearingRequestMainModel.hearingDetails.isPaperHearing
      ? 'Yes'
      : 'No';
  }

  private getParticipantChannels(): HearingChannelMode[] {
    const participantChannels: HearingChannelMode[] = [];
    this.hearingRequestMainModel.hearingDetails?.hearingChannels?.forEach((hearingChannel) => {
      const partyChannelFromRefData = this.partyChannelsRefDataCombined.find(
        (partyChannel) => partyChannel.key === hearingChannel
      );
      if (partyChannelFromRefData) {
        participantChannels.push({
          hearingChannel: partyChannelFromRefData.value_en,
          hearingChannelChanged: this.getHearingChannelChanged(partyChannelFromRefData.key),
        });
      }
    });
    return participantChannels;
  }

  private getParticipantAttendanceModes(): ParticipantAttendanceMode[] {
    const participantAttendanceModes: ParticipantAttendanceMode[] = [];
    const individualPartiesFromRequest = this.partyDetailsChangesConfirmed
      ? this.hearingRequestMainModel.partyDetails?.filter((partyFromRequest) => partyFromRequest.partyType === PartyType.IND)
      : this.hearingRequestToCompareMainModel.partyDetails?.filter(
          (partyFromRequest) => partyFromRequest.partyType === PartyType.IND
        );
    const partiesFromServiceValue = this.serviceHearingValuesModel.parties?.filter(
      (partiesFromService) => partiesFromService.partyType === PartyType.IND
    );
    individualPartiesFromRequest.forEach((individualParty: PartyDetailsModel) => {
      const foundPartyFromService = partiesFromServiceValue.find(
        (partyFromService) => partyFromService.partyID === individualParty.partyID
      );
      participantAttendanceModes.push({
        partyName: this.getPartyName(individualParty, foundPartyFromService),
        channel: this.getPartyChannelValue(individualParty),
        partyNameChanged: this.getPartyNameChanged(individualParty.partyID),
        partyChannelChanged: this.getPartyChannelChanged(individualParty),
      });
    });
    return participantAttendanceModes;
  }

  private getPartyName(individualParty: PartyDetailsModel, foundPartyFromService: PartyDetailsModel): string {
    if (individualParty.individualDetails) {
      return HearingsUtils.getPartyNameFormatted(individualParty.individualDetails);
    }
    if (foundPartyFromService) {
      const partyNameFormatted = HearingsUtils.getPartyNameFormatted(foundPartyFromService.individualDetails);
      return partyNameFormatted.length > 0 ? partyNameFormatted : foundPartyFromService.partyID;
    }
    return '';
  }

  private getPartyChannelValue(individualParty: PartyDetailsModel): string {
    let preferredHearingChannelRefData = null;
    if (individualParty.individualDetails) {
      preferredHearingChannelRefData = this.partyChannelsRefDataCombined.find(
        (ref) => ref.key === individualParty.individualDetails?.preferredHearingChannel
      );
    }
    return preferredHearingChannelRefData?.value_en ? ` - ${preferredHearingChannelRefData.value_en}` : '';
  }

  private getPartyNameChanged(partyId: string): boolean {
    if (this.isPaperHearing === 'Yes') {
      return false;
    }
    const partyInSHV = this.serviceHearingValuesModel.parties.find((party) => party.partyID === partyId);
    const partyInHMC = this.hearingRequestMainModel.partyDetails.find((party) => party.partyID === partyId);
    if (partyInSHV) {
      const partyInHMCToCompare = this.hearingRequestToCompareMainModel.partyDetails.find((party) => party.partyID === partyId);
      if (partyInHMCToCompare) {
        return HearingsUtils.hasPartyNameChanged(partyInHMCToCompare, partyInHMC);
      }
      // Return true as it is a new party available only in SHV
      return true;
    }
    return false;
  }

  private getHearingChannelChanged(hearingChannel: string): boolean {
    const hearingChannelInHMCToCompare = this.hearingRequestToCompareMainModel.hearingDetails.hearingChannels.find(
      (hearingChannelToCompare) => hearingChannel === hearingChannelToCompare
    );
    return !hearingChannelInHMCToCompare;
  }

  private getPartyChannelChanged(partyDetails: PartyDetailsModel): boolean {
    if (this.isPaperHearing === 'Yes') {
      return false;
    }
    const partyInHMC = this.hearingRequestMainModel.partyDetails.find((party) => party.partyID === partyDetails.partyID);
    const partyInHMCToCompare = this.hearingRequestToCompareMainModel.partyDetails.find(
      (party) => party.partyID === partyDetails.partyID
    );
    return !_.isEqual(
      partyInHMC?.individualDetails?.preferredHearingChannel,
      partyInHMCToCompare?.individualDetails?.preferredHearingChannel
    );
  }

  private getNumberOfPhysicalAttendees(): number {
    return this.hearingRequestMainModel.hearingDetails?.numberOfPhysicalAttendees || 0;
  }

  private setAmendmentLabels(): void {
    this.isPaperHearingChanged = !_.isEqual(
      this.hearingRequestToCompareMainModel.hearingDetails.hearingChannels?.includes(HearingChannelEnum.ONPPR),
      this.hearingRequestMainModel.hearingDetails.hearingChannels?.includes(HearingChannelEnum.ONPPR) ||
        !!this.hearingRequestMainModel.hearingDetails.isPaperHearing
    );

    this.numberOfPhysicalAttendeesChanged = !_.isEqual(
      this.hearingRequestToCompareMainModel.hearingDetails?.numberOfPhysicalAttendees || 0,
      this.hearingRequestMainModel.hearingDetails?.numberOfPhysicalAttendees || 0
    );

    const numberOfAttendeesChanged = !_.isEqual(
      this.hearingRequestToCompareMainModel?.partyDetails.length || 0,
      this.hearingRequestMainModel?.partyDetails.length || 0
    );

    const methodOfAttendanceChanged = !_.isEqual(
      this.hearingRequestToCompareMainModel.hearingDetails?.hearingChannels,
      this.hearingRequestMainModel.hearingDetails?.hearingChannels || []
    );

    const participantChannelsChanged = this.participantAttendanceModes.some((mode) => mode.partyChannelChanged === true);

    const participantNameChanged = this.participantAttendanceModes.some((mode) => mode.partyNameChanged === true);

    const changesMadeToParticipantAttendance =
      this.isPaperHearingChanged ||
      this.numberOfPhysicalAttendeesChanged ||
      numberOfAttendeesChanged ||
      methodOfAttendanceChanged ||
      participantChannelsChanged ||
      participantNameChanged;

    if (this.partyDetailsChangesRequired) {
      if (!this.partyDetailsChangesConfirmed) {
        this.pageTitleDisplayLabel = AmendmentLabelStatus.ACTION_NEEDED;
      } else {
        this.pageTitleDisplayLabel = changesMadeToParticipantAttendance
          ? AmendmentLabelStatus.AMENDED
          : AmendmentLabelStatus.NONE;
      }
    } else {
      if (changesMadeToParticipantAttendance) {
        this.pageTitleDisplayLabel = AmendmentLabelStatus.AMENDED;
      }
    }
  }
}
