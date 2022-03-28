import { HearingAdjournedSummaryComponent } from './hearing-adjourned-summary/hearing-adjourned-summary.component';
import { HearingCancellationSummaryComponent } from './hearing-cancellation-summary/hearing-cancellation-summary.component';
import { HearingCancelledSummaryComponent } from './hearing-cancelled-summary/hearing-cancelled-summary.component';
import { HearingCompletedSummaryComponent } from './hearing-completed-summary/hearing-completed-summary.component';
import { HearingRequestFailedSummaryComponent } from './hearing-request-failed-summary/hearing-request-failed-summary.component';
import { ViewHearingComponent } from './view-hearing.component';

export const containers: any[] = [
  ViewHearingComponent,
  HearingCancellationSummaryComponent,
  HearingCancelledSummaryComponent,
  HearingCompletedSummaryComponent,
  HearingAdjournedSummaryComponent,
  HearingRequestFailedSummaryComponent,
];
