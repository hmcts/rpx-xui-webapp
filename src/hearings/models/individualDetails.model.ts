import {RelatedPartiesModel} from './relatedParties.model';

export interface IndividualDetailsModel {
  title?: string;
  firstName?: string;
  lastName?: string;
  preferredHearingChannel?: string;
  interpreterLanguage?: string;
  reasonableAdjustments?: string[];
  vulnerableFlag?: boolean;
  vulnerabilityDetails?: string;
  hearingChannelEmail?: string[];
  hearingChannelPhone?: string[];
  relatedParties?: RelatedPartiesModel[];
}
