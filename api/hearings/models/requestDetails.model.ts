export interface ResponseDetailsModel {
  hearingRequestID?: string;
  status?: string;
  timeStamp: string;
  versionNumber: number;
}

export interface RequestDetailsModel extends ResponseDetailsModel {
  hearingGroupRequestId?: string;
  partiesNotified?: string;
  cancellationReasonCodes?: string[];
}
