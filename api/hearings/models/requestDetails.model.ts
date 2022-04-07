export interface RequestDetailsModel extends ResponseDetailsModel {
  hearingGroupRequestId?: string;
  partiesNotified?: string;
}

export interface ResponseDetailsModel {
  hearingRequestID?: string;
  status?: string;
  timeStamp: string;
  versionNumber: number;
}
