import { ScreenNavigationModel } from '../models/screenNavigation.model';

export const DEFAULT_SCREEN_FLOW: ScreenNavigationModel[] = [
  {
    screenName: 'hearing-requirements',
    navigation: [
      {
        resultValue: 'hearing-facilities'
      }
    ]
  },
  {
    screenName: 'hearing-facilities',
    navigation: [
      {
        resultValue: 'hearing-stage'
      }
    ]
  },
  {
    screenName: 'hearing-stage',
    navigation: [
      {
        resultValue: 'hearing-attendance'
      }
    ]
  },
  {
    screenName: 'hearing-attendance',
    navigation: [
      {
        resultValue: 'hearing-venue'
      }
    ]
  },
  {
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
  },
  {
    screenName: 'hearing-welsh',
    navigation: [
      {
        resultValue: 'hearing-judge'
      }
    ]
  },
  {
    screenName: 'hearing-judge',
    navigation: [
      {
        resultValue: 'hearing-panel'
      }
    ]
  },
  {
    screenName: 'hearing-panel',
    navigation: [
      {
        resultValue: 'hearing-timing'
      }
    ]
  },
  {
    screenName: 'hearing-timing',
    navigation: [
      {
        resultValue: 'hearing-link'
      }
    ]
  },
  {
    screenName: 'hearing-link',
    navigation: [
      {
        resultValue: 'hearing-additional-instructions'
      }
    ]
  },
  {
    screenName: 'hearing-additional-instructions',
    navigation: [
      {
        resultValue: 'hearing-create-edit-summary'
      }
    ]
  }
];

export const DEFAULT_SCREEN_FLOW_NEW: ScreenNavigationModel[] = [
  {
    screenName: 'hearing-requirements',
    navigation: [
      {
        resultValue: 'hearing-facilities'
      }
    ]
  },
  {
    screenName: 'hearing-facilities',
    navigation: [
      {
        resultValue: 'hearing-stage'
      }
    ]
  },
  {
    screenName: 'hearing-stage',
    navigation: [
      {
        resultValue: 'hearing-attendance'
      }
    ]
  },
  {
    screenName: 'hearing-attendance',
    navigation: [
      {
        resultValue: 'hearing-venue'
      }
    ]
  },
  {
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
        resultValue: 'hearing-panel-required'
      }
    ]
  },
  {
    screenName: 'hearing-welsh',
    navigation: [
      {
        resultValue: 'hearing-panel-required'
      }
    ]
  },
  {
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
  },
  {
    screenName: 'hearing-judge',
    navigation: [
      {
        resultValue: 'hearing-timing'
      }
    ]
  },
  {
    screenName: 'hearing-panel-selector',
    navigation: [
      {
        resultValue: 'hearing-timing'
      }
    ]
  },
  {
    screenName: 'hearing-timing',
    navigation: [
      {
        resultValue: 'hearing-link'
      }
    ]
  },
  {
    screenName: 'hearing-link',
    navigation: [
      {
        resultValue: 'hearing-additional-instructions'
      }
    ]
  },
  {
    screenName: 'hearing-additional-instructions',
    navigation: [
      {
        resultValue: 'hearing-create-edit-summary'
      }
    ]
  }
];
