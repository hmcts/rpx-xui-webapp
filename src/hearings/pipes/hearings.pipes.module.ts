import { NgModule } from '@angular/core';
import { CaseReferencePipe } from './case-reference.pipe';
import { HearingAnswersPipe } from './hearing-answers.pipe';
import { HearingsBadgePipe } from './hearings-badge.pipe';
import { IsAmendedPipe } from './is-amended.pipe';
import { PartyChannelDisplayValuePipe } from './party-channel-display-value.pipe';
import { PartyRoleDisplayValuePipe } from './party-role-display-value.pipe';
import { ShowHidePipe } from './show-hide.pipe';

@NgModule({
  declarations: [
    HearingsBadgePipe,
    HearingAnswersPipe,
    IsAmendedPipe,
    ShowHidePipe,
    PartyChannelDisplayValuePipe,
    PartyRoleDisplayValuePipe,
    CaseReferencePipe,
  ],
  exports: [
    HearingsBadgePipe,
    HearingAnswersPipe,
    PartyChannelDisplayValuePipe,
    PartyRoleDisplayValuePipe,
    IsAmendedPipe,
    ShowHidePipe,
    CaseReferencePipe
  ]
})
export class HearingsPipesModule {
}
