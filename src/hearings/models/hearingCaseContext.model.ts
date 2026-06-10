export interface HearingValuesCaseContext {
  jurisdictionId?: string;
  caseReference?: string;
  caseType?: string;
  hearingId?: string;
}

export interface ResolvedHearingValuesCaseContext extends HearingValuesCaseContext {
  jurisdictionId: string;
  caseReference: string;
}
