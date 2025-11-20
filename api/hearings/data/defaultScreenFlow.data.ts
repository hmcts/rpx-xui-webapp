import { ScreenNavigationModel } from '../models/screenNavigation.model';

export const HEARING_REQUIREMENTS: ScreenNavigationModel = {
  screenName: 'hearing-requirements',
  navigation: [
    {
      resultValue: 'hearing-facilities'
    }
  ]
};

export const HEARING_FACILITIES: ScreenNavigationModel = {
  screenName: 'hearing-facilities',
  navigation: [
    {
      resultValue: 'hearing-stage'
    }
  ]
};

export const HEARING_STAGE: ScreenNavigationModel = {
  screenName: 'hearing-stage',
  navigation: [
    {
      resultValue: 'hearing-attendance'
    }
  ]
};

export const HEARING_ATTENDANCE: ScreenNavigationModel = {
  screenName: 'hearing-attendance',
  navigation: [
    {
      resultValue: 'hearing-venue'
    }
  ]
};

export const HEARING_VENUE: ScreenNavigationModel = {
  screenName: 'hearing-venue',
  conditionKey: 'regionId',
  navigation: [
    {
      conditionOperator: 'INCLUDE',
      conditionValue: '7',
      resultValue: 'hearing-welsh'
    },
    {
      conditionOperator: 'NOT INCLUDE',
      conditionValue: '7',
      resultValue: 'hearing-judge'
    }
  ]
};

export const HEARING_WELSH: ScreenNavigationModel = {
  screenName: 'hearing-welsh',
  navigation: [
    {
      resultValue: 'hearing-judge'
    }
  ]
};

export const HEARING_PANEL_REQUIRED: ScreenNavigationModel = {
  screenName: 'hearing-panel-required',
  conditionKey: 'isAPanelFlag',
  navigation: [
    {
      conditionOperator: 'EQUALS',
      conditionValue: true,
      resultValue: 'hearing-panel-selector'
    },
    {
      conditionOperator: 'EQUALS',
      conditionValue: false,
      resultValue: 'hearing-judge'
    }
  ]
};

export const HEARING_JUDGE: ScreenNavigationModel = {
  screenName: 'hearing-judge',
  navigation: [
    {
      resultValue: 'hearing-panel'
    }
  ]
};

export const HEARING_PANEL_SELECTOR: ScreenNavigationModel = {
  screenName: 'hearing-panel-selector',
  navigation: [
    {
      resultValue: 'hearing-timing'
    }
  ]
};

export const HEARING_PANEL: ScreenNavigationModel = {
  screenName: 'hearing-panel',
  navigation: [
    {
      resultValue: 'hearing-timing'
    }
  ]
};

export const HEARING_TIMING: ScreenNavigationModel = {
  screenName: 'hearing-timing',
  navigation: [
    {
      resultValue: 'hearing-link'
    }
  ]
};

export const HEARING_LINK: ScreenNavigationModel = {
  screenName: 'hearing-link',
  navigation: [
    {
      resultValue: 'hearing-additional-instructions'
    }
  ]
};

export const HEARING_ADDITIONAL_INSTRUCTIONS: ScreenNavigationModel = {
  screenName: 'hearing-additional-instructions',
  navigation: [
    {
      resultValue: 'hearing-create-edit-summary'
    }
  ]
};

export const DEFAULT_SCREEN_FLOW: ScreenNavigationModel[] = [
  HEARING_REQUIREMENTS,
  HEARING_FACILITIES,
  HEARING_STAGE,
  HEARING_ATTENDANCE,
  HEARING_VENUE,
  HEARING_WELSH,
  HEARING_JUDGE,
  HEARING_PANEL,
  HEARING_TIMING,
  HEARING_LINK,
  HEARING_ADDITIONAL_INSTRUCTIONS
];

export const DEFAULT_SCREEN_FLOW_NEW: ScreenNavigationModel[] = [
  HEARING_REQUIREMENTS,
  HEARING_FACILITIES,
  HEARING_STAGE,
  HEARING_ATTENDANCE,
  replaceResultValue(HEARING_VENUE, 'hearing-judge', 'hearing-panel-required'),
  replaceResultValue(HEARING_WELSH, 'hearing-judge', 'hearing-panel-required'),
  HEARING_PANEL_REQUIRED,
  replaceResultValue(HEARING_JUDGE, 'hearing-panel', 'hearing-timing'),
  HEARING_PANEL_SELECTOR,
  HEARING_TIMING,
  HEARING_LINK,
  HEARING_ADDITIONAL_INSTRUCTIONS
];

export function replaceResultValue(
  screenFlow: ScreenNavigationModel,
  targetValue: string,
  replacementValue: string
): ScreenNavigationModel {
  return {
    ...screenFlow,
    navigation: screenFlow.navigation.map((nav) => ({
      ...nav,
      resultValue: nav.resultValue === targetValue ? replacementValue : nav.resultValue
    }))
  };
}
