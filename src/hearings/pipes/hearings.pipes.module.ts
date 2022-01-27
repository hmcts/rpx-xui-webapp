import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CamelToSentenceCasePipe } from './camel-to-sentencecase.pipe';
import { HearingsBadgePipe } from './hearings-badge.pipe';

@NgModule({
  declarations: [
    HearingsBadgePipe,
    CamelToSentenceCasePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    HearingsBadgePipe,
    CamelToSentenceCasePipe
  ]
})
export class HearingsPipesModule {
}
