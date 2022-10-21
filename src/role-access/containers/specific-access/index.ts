import { SpecificAccessApprovedComponent } from './specific-access-approved/specific-access-approved.component';
import { SpecificAccessDeniedComponent } from './specific-access-denied/specific-access-denied.component';
import {
  SpecificAccessDuplicateRecordComponent
} from './specific-access-duplicate-record/specific-access-duplicate-record.component';
import { SpecificAccessDurationComponent } from './specific-access-duration/specific-access-duration.component';
import { SpecificAccessHomeComponent } from './specific-access-home/specific-access-home.component';
import { SpecificAccessInformationComponent } from './specific-access-information/specific-access-information.component';
import { SpecificAccessNavigationComponent } from './specific-access-navigation/specific-access-navigation.component';
import { SpecificAccessReviewComponent } from './specific-access-review/specific-access-review.component';

export const containers: any[] = [
  SpecificAccessHomeComponent,
  SpecificAccessNavigationComponent,
  SpecificAccessReviewComponent,
  SpecificAccessDurationComponent,
  SpecificAccessApprovedComponent,
  SpecificAccessInformationComponent,
  SpecificAccessDeniedComponent,
  SpecificAccessDuplicateRecordComponent
];

export * from './specific-access-approved/specific-access-approved.component';
export * from './specific-access-denied/specific-access-denied.component';
export * from './specific-access-duration/specific-access-duration.component';
export * from './specific-access-home/specific-access-home.component';
export * from './specific-access-information/specific-access-information.component';
export * from './specific-access-navigation/specific-access-navigation.component';
export * from './specific-access-review/specific-access-review.component';
export * from './specific-access-duplicate-record/specific-access-duplicate-record.component';
