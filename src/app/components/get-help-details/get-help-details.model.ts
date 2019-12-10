export enum BADGE_COLOUR {
  BADGE_RED = 'hmcts-badge--red',
  BADGE_BLUE = 'hmcts-badge--blue',
  BADGE_GREEN = 'hmcts-badge--green',
}

export interface GetHelpDetailsDataModel {
    title: string;
    badgeColour: BADGE_COLOUR;
    badgeText: string;
    email: string;
    phone: string;
    openingTimes: string;
}
