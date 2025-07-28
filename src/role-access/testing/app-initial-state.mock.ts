import { AppTestConstants } from '../../app/app.test-constants.spec';
import { State } from '../../app/store';

export const initialMockState: State = {
  routerReducer: null,
  appConfig: {
    config: {},
    termsAndCondition: null,
    loaded: true,
    loading: true,
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
        roles: [AppTestConstants.IA_JUDGE_ROLE],
        uid: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
        surname: 'judge'
      },
      roleAssignmentInfo: [
        {
          baseLocation: '231596',
          jurisdiction: 'IA',
          isCaseAllocator: true
        },
        {
          baseLocation: '',
          jurisdiction: 'JUDICIAL',
          isCaseAllocator: true
        },
        {
          baseLocation: '',
          jurisdiction: 'DIVORCE',
          isCaseAllocator: false
        }
      ]
    },
    decorate16digitCaseReferenceSearchBoxInHeader: false
  }
};
