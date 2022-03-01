import {NgModule} from '@angular/core';
import {HearingAnswersPipe} from './hearing-answers.pipe';
import {HearingUpdateLinkPipe} from './hearing-update-link.pipe';
import {HearingsBadgePipe} from './hearings-badge.pipe';
import {IsAmendedPipe} from './is-amended.pipe';
import {ShowHidePipe} from './show-hide.pipe';

@NgModule({
  declarations: [
    HearingsBadgePipe,
    HearingAnswersPipe,
    ShowHidePipe,
    IsAmendedPipe,
    ShowHidePipe,
    HearingUpdateLinkPipe
  ],
  exports: [
    HearingsBadgePipe,
    HearingAnswersPipe,
    ShowHidePipe,
    IsAmendedPipe,
    HearingUpdateLinkPipe,
    ShowHidePipe
  ]
})
export class HearingsPipesModule {
}
