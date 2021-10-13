import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HearingsBadgePipe } from './hearings-badge.pipe';

@NgModule({
  declarations: [
    HearingsBadgePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    HearingsBadgePipe
  ]
})
export class HearingsPipesModule {
}
