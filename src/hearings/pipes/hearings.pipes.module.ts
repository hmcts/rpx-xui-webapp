import { NgModule } from '@angular/core';
import { HearingAnswersPipe } from './hearing-answers.pipe';
import { HearingUpdateLinkPipe } from './hearing-update-link.pipe';
import { HearingsBadgePipe } from './hearings-badge.pipe';
import { ShowHidePipe } from './show-hide.pipe';

@NgModule({
  declarations: [
    HearingsBadgePipe,
    HearingAnswersPipe,
    ShowHidePipe,
    HearingUpdateLinkPipe
  ],
  exports: [
    HearingsBadgePipe,
    HearingAnswersPipe,
    HearingUpdateLinkPipe,
    ShowHidePipe
  ]
})
export class HearingsPipesModule {
}
