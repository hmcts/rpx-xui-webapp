import { CaseHearingModel } from 'api/hearings/models/caseHearing.model';
export interface CaseHearingViewModel extends CaseHearingModel {
    mostRecentHearingStartDateTime: string;
    orderNumber?: number;
}
