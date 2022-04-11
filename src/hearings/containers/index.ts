import * as fromCancelHearing from './cancel-hearing';
import * as fromHearingActuals from './hearing-actuals';
import * as fromRequestHearing from './request-hearing';
import * as fromViewHearing from './view-hearing';
import * as fromLinkedHearing from './linked-hearing'

export const containers: any[] = [
  ...fromCancelHearing.containers,
  ...fromRequestHearing.containers,
  ...fromViewHearing.containers,
  ...fromHearingActuals.containers,
  ...fromLinkedHearing.containers  
];
