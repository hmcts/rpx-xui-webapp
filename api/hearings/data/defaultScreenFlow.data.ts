import {ScreenNavigationModel} from '../models/screenNavigation.model';

export const DEFAULT_SCREEN_FLOW: ScreenNavigationModel[] = [
  {
   screenName: 'hearing-requirements',
   navigation: [
      {
       resultValue: 'hearing-facilities',
      },
    ],
  },
  {
   screenName: 'hearing-facilities',
   navigation: [
      {
       resultValue: 'hearing-stage',
      },
    ],
  },
  {
   screenName: 'hearing-stage',
   navigation: [
      {
       resultValue: 'hearing-attendance',
      },
    ],
  },
  {
   screenName: 'hearing-attendance',
   navigation: [
      {
       resultValue: 'hearing-venue',
      },
    ],
  },
  {
   screenName: 'hearing-venue',
   conditionKey: 'region',
   navigation: [
      {
       conditionOperator: 'INCLUDE',
       conditionValue: 'Wales',
       resultValue: 'hearing-welsh',
      },
      {
       conditionOperator: 'NOT INCLUDE',
       conditionValue: 'Wales',
       resultValue: 'hearing-judge',
      },
    ],
  },
  {
   screenName: 'hearing-welsh',
   navigation: [
      {
       resultValue: 'hearing-judge',
      },
    ],
  },
  {
   screenName: 'hearing-judge',
   navigation: [
      {
       resultValue: 'hearing-panel',
      },
    ],
  },
  {
   screenName: 'hearing-panel',
   navigation: [
      {
       resultValue: 'hearing-timing',
      },
    ],
  },
  {
   screenName: 'hearing-timing',
   navigation: [
      {
       resultValue: 'hearing-link',
      },
    ],
  },
  {
   screenName: 'hearing-link',
   navigation: [
      {
       resultValue: 'hearing-additional-instructions',
      },
    ],
  },
  {
   screenName: 'hearing-additional-instructions',
   navigation: [
      {
       resultValue: 'hearing-create-edit-summary',
      },
    ],
  },
];
