import { State } from 'src/app/store';

export const initialMockState: State = {
  routerReducer: null,
  appConfig: {
    config: {},
    termsAndCondition: null,
    loaded: true,
    loading: true,
    locationInfo: [
      {
        primaryLocation: '231596',
        caseId: '1589185661976908',
        jurisdiction: 'IA',
        region: 'north-east',
        isCaseAllocator: true
      }
    ],
    termsAndConditions: null,
    isTermsAndConditionsFeatureEnabled: null,
    useIdleSessionTimeout: null,
    userDetails: {
      sessionTimeout: {
        idleModalDisplayTime: 0,
        totalIdleTime: 0
      },
      canShareCases: true,
      userInfo: {
        id: '',
        active: true,
        email: 'juser4@mailinator.com',
        forename: 'XUI test',
        roles: ['caseworker-ia-iacjudge'],
        uid: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
        surname: 'judge'
      }
    }
  }
};
