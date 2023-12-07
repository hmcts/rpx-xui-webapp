import * as fromCancelHearing from './cancel-hearing';
import * as fromHearingActuals from './hearing-actuals';
import * as fromLinkedHearings from './linked-hearings';
import * as fromRequestHearing from './request-hearing';
import * as fromViewHearing from './view-hearing';

export const containers: any[] = [
  ...fromCancelHearing.containers,
  ...fromRequestHearing.containers,
  ...fromViewHearing.containers,
  ...fromHearingActuals.containers,
  ...fromLinkedHearings.containers
];
