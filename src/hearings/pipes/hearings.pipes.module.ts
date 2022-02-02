import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {HearingAnswersPipe} from './hearing-answers.pipe';
import { HearingsBadgePipe } from './hearings-badge.pipe';

@NgModule({
  declarations: [
    HearingsBadgePipe,
    HearingAnswersPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    HearingsBadgePipe,
    HearingAnswersPipe
  ]
})
export class HearingsPipesModule {
}
