import * as fromCancelHearing from './cancel-hearing';
import * as fromChangeHearing from './change-hearing';
import * as fromRequestHearing from './request-hearing';
import * as fromViewHearing from './view-hearing';

export const containers: any[] = [
  ...fromCancelHearing.containers,
  ...fromChangeHearing.containers,
  ...fromRequestHearing.containers,
  ...fromViewHearing.containers
];
