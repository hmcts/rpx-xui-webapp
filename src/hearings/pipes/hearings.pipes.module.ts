import {NgModule} from '@angular/core';
import {CaseReferencePipe} from './case-reference.pipe';
import {ConvertToValuePipe} from './convert-to-value.pipe';
import {HearingAnswersPipe} from './hearing-answers.pipe';
import {HearingsBadgePipe} from './hearings-badge.pipe';
import {IsAmendedPipe} from './is-amended.pipe';
import {ShowHidePipe} from './show-hide.pipe';

@NgModule({
  declarations: [
    HearingsBadgePipe,
    HearingAnswersPipe,
    IsAmendedPipe,
    ShowHidePipe,
    ConvertToValuePipe,
    CaseReferencePipe,
  ],
  exports: [
    HearingsBadgePipe,
    HearingAnswersPipe,
    ConvertToValuePipe,
    IsAmendedPipe,
    ShowHidePipe,
    CaseReferencePipe
  ]
})
export class HearingsPipesModule {
}
