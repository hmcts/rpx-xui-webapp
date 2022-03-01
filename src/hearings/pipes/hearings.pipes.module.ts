import {NgModule} from '@angular/core';
import {HearingAnswersPipe} from './hearing-answers.pipe';
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
  ],
  exports: [
    HearingsBadgePipe,
    HearingAnswersPipe,
    ShowHidePipe,
    IsAmendedPipe,
    ShowHidePipe
  ]
})
export class HearingsPipesModule {
}
