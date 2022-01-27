import { TitleCasePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CamelToTitleCasePipe } from './camel-to-titlecase.pipe';
import { HearingsBadgePipe } from './hearings-badge.pipe';

@NgModule({
  declarations: [
    HearingsBadgePipe,
    CamelToTitleCasePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [TitleCasePipe],
  exports: [
    HearingsBadgePipe,
    CamelToTitleCasePipe
  ]
})
export class HearingsPipesModule {
}
