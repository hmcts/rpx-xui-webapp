import {NgModule} from '@angular/core';
import {HearingAnswersPipe} from './hearing-answers.pipe';
import {HearingsBadgePipe} from './hearings-badge.pipe';
import {IsAmendedPipe} from './is-amended.pipe';
import {ShowHidePipe} from './show-hide.pipe';
import { PartyChannelDisplayValuePipe } from './party-channel-display-value.pipe';
import { PartyRoleDisplayValuePipe } from './party-role-display-value.pipe';

@NgModule({
  declarations: [
    HearingsBadgePipe,
    HearingAnswersPipe,
    ShowHidePipe,
    IsAmendedPipe,
    ShowHidePipe,
    PartyChannelDisplayValuePipe,
    PartyRoleDisplayValuePipe,
  ],
  exports: [
    HearingsBadgePipe,
    HearingAnswersPipe,
    PartyChannelDisplayValuePipe,
    PartyRoleDisplayValuePipe,
    ShowHidePipe,
    IsAmendedPipe,
    ShowHidePipe
  ]
})
export class HearingsPipesModule {
}
