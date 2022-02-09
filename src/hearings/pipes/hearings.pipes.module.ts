import {NgModule} from '@angular/core';
import {HearingAnswersPipe} from './hearing-answers.pipe';
import {HearingsBadgePipe} from './hearings-badge.pipe';
import {ShowHidePipe} from './show-hide.pipe';

@NgModule({
  declarations: [
    HearingsBadgePipe,
    HearingAnswersPipe,
    ShowHidePipe
  ],
  exports: [
    HearingsBadgePipe,
    HearingAnswersPipe,
    ShowHidePipe
  ]
})
export class HearingsPipesModule {
}
