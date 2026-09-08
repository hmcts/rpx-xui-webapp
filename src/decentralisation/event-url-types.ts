import { Params } from '@angular/router';

interface BuildDecentralisedEventUrlCommonInput {
  eventId: string;
  caseType: string;
  queryParams?: Params;
}

export interface BuildDecentralisedCaseCreateEventUrlInput extends BuildDecentralisedEventUrlCommonInput {
  isCaseCreate: true;
  jurisdiction: string;
}

export interface BuildDecentralisedCaseEventUrlInput extends BuildDecentralisedEventUrlCommonInput {
  isCaseCreate: false;
  caseId: string;
}

export type BuildDecentralisedEventUrlInput = BuildDecentralisedCaseCreateEventUrlInput | BuildDecentralisedCaseEventUrlInput;
