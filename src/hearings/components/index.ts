import {CaseFlagsComponent} from './case-flags/case-flags.component';
import { HearingJudgeNameComponent } from './hearing-judge-name/hearing-judge-name.component';
import { HearingJudgeNamesListComponent } from './hearing-judge-names-list/hearing-judge-names-list.component';
import { HearingPartiesTitleComponent } from './hearing-parties-title/hearing-parties-title.component';
import { PartiesUnavailableDatesComponent } from './parties-unavailable-dates/parties-unavailable-dates.component';

export const components: any[] = [
  CaseFlagsComponent,
  HearingPartiesTitleComponent,
  PartiesUnavailableDatesComponent,
  HearingJudgeNameComponent,
  HearingJudgeNamesListComponent
];

export * from '../components/case-flags/case-flags.component';
export * from '../components/hearing-parties-title/hearing-parties-title.component';
export * from '../components/parties-unavailable-dates/parties-unavailable-dates.component';
export * from '../components/hearing-judge-name/hearing-judge-name.component';
export * from '../components/hearing-judge-names-list/hearing-judge-names-list.component';

