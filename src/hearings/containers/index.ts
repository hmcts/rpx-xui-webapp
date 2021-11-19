import { HearingPartiesTitleComponent } from '../components/hearing-parties-title/hearing-parties-title.component';
import { WelshHearingComponent } from '../containers/request-hearing/welsh-hearing/welsh-hearing.component';
import { CancelHearingComponent } from './cancel-hearing/cancel-hearing.component';
import { ChangeHearingComponent } from './change-hearing/change-hearing.component';
import { RequestHearingComponent } from './request-hearing/request-hearing.component';
import { ViewHearingComponent } from './view-hearing/view-hearing.component';
import { LocationSearchContainerComponent } from './request-hearing/location-search-container/location-search-container.component';

export const containers: any[] = [
  CancelHearingComponent,
  ChangeHearingComponent,
  RequestHearingComponent,
  ViewHearingComponent,
  LocationSearchContainerComponent
  WelshHearingComponent,
];

export * from './cancel-hearing/cancel-hearing.component';
export * from './change-hearing/change-hearing.component';
export * from './request-hearing/request-hearing.component';
export * from './view-hearing/view-hearing.component';
export * from './request-hearing/location-search-container/location-search-container.component';
export * from '../containers/request-hearing/welsh-hearing/welsh-hearing.component';
export * from '../components/hearing-parties-title/hearing-parties-title.component';

