import { expect } from 'chai';
import { SERVICE_HEARING_VALUES } from './data/serviceHearingValues.mock.data';
import {
  mapDataByDefault,
  retrieveForceNewDefaultScreenFlow,
  replaceScreenFlow,
  toBoolean,
  forceDefaultScreenFlow
} from './services.index';
import { DEFAULT_SCREEN_FLOW_NEW } from './data/defaultScreenFlow.data';
import * as sinon from 'sinon';
import * as configuration from '../configuration';

interface NavigationItem {
  resultValue: string;
  conditionOperator?: string;
  conditionValue?: any;
}

interface Screen {
  screenName: string;
  conditionKey?: string;
  navigation: NavigationItem[];
}

const newScreenSequence: Screen[] = [
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
      { resultValue: 'hearing-panel-required' }
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
      { resultValue: 'next-screen' }
    ]
  },
  {
    screenName: 'hearing-panel-selector',
    navigation: [
      { resultValue: 'next-screen' }
    ]
  }
];

describe('hearings services', () => {
  describe('mapDataByDefault', () => {
    it('should return data with no modifications if no case flags', () => {
      const data = SERVICE_HEARING_VALUES;
      const result = mapDataByDefault(data);
      expect(result.caseFlags.flags.length).to.equal(0);
    });

    it('should set the flagId and return the result', () => {
      const data = SERVICE_HEARING_VALUES;
      data.caseFlags = {
        flags: [
          {
            partyID: '26e278a9-4051-4e',
            partyName: 'miss defendant1 lit friend hnl',
            flagId: 'PF0015',
            flagDescription: 'Language Interpreter',
            flagStatus: 'Active'
          },
          {
            partyID: 'f07420e6-5d4d-43',
            partyName: 'miss defendant1 lit friend hnl',
            flagId: 'RA0012',
            flagDescription: 'Braille documents',
            flagStatus: 'Active'
          }
        ],
        flagAmendURL: '/flag/amend'
      };
      const result = mapDataByDefault(data);
      expect(result.caseFlags.flags[0].partyId).to.equal('26e278a9-4051-4e');
      expect(result.caseFlags.flags[1].partyId).to.equal('f07420e6-5d4d-43');
    });

    it('should return flagID as null if flagId contains value', () => {
      const data = SERVICE_HEARING_VALUES;
      data.caseFlags = {
        flags: [
          {
            partyId: '26e278a9-4051-4e',
            partyName: 'miss defendant1 lit friend hnl',
            flagId: 'PF0015',
            flagDescription: 'Language Interpreter',
            flagStatus: 'Active'
          },
          {
            partyId: 'f07420e6-5d4d-43',
            partyName: 'miss defendant1 lit friend hnl',
            flagId: 'RA0012',
            flagDescription: 'Braille documents',
            flagStatus: 'Active'
          }
        ],
        flagAmendURL: '/flag/amend'
      };
      const result = mapDataByDefault(data);
      expect(result.caseFlags.flags[0].partyID).to.equal(undefined);
      expect(result.caseFlags.flags[1].partyID).to.equal(undefined);
    });
  });
});

describe('retrieveForceNewDefaultScreenFlow', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('returns true when showFeature returns true', () => {
    const showFeatureStub = sinon.stub(configuration, 'showFeature').returns(true);
    const result = retrieveForceNewDefaultScreenFlow();
    expect(result).to.be.true;
  });

  it('returns false when showFeature returns false', () => {
    const showFeatureStub = sinon.stub(configuration, 'showFeature').returns(false);
    const result = retrieveForceNewDefaultScreenFlow();
    expect(result).to.be.false;
  });

  it('returns false when showFeature throws an error', () => {
    const showFeatureStub = sinon.stub(configuration, 'showFeature').throws(new Error('Error'));
    const result = retrieveForceNewDefaultScreenFlow();
    expect(result).to.be.false;
  });
  describe('toBoolean', () => {
    it('should return true for boolean true', () => {
      const result = toBoolean(true);
      expect(result).to.be.true;
    });

    it('should return false for boolean false', () => {
      const result = toBoolean(false);
      expect(result).to.be.false;
    });

    it('should return true for string "true" (case insensitive)', () => {
      const result = toBoolean('true');
      expect(result).to.be.true;

      const resultCaseInsensitive = toBoolean('TRUE');
      expect(resultCaseInsensitive).to.be.true;
    });

    it('should return false for string "false" (case insensitive)', () => {
      const result = toBoolean('false');
      expect(result).to.be.false;

      const resultCaseInsensitive = toBoolean('FALSE');
      expect(resultCaseInsensitive).to.be.false;
    });

    it('should return false for non-boolean, non-"true"/"false" strings', () => {
      const result = toBoolean('randomString');
      expect(result).to.be.false;
    });

    it('should return false for non-boolean, non-string values', () => {
      const result = toBoolean(123);
      expect(result).to.be.false;

      const resultNull = toBoolean(null);
      expect(resultNull).to.be.false;

      const resultUndefined = toBoolean(undefined);
      expect(resultUndefined).to.be.false;

      const resultObject = toBoolean({});
      expect(resultObject).to.be.false;
    });
  });
  describe('replaceScreenFlow', () => {

    it('should maintain passed in screen flow as flow does not match sequence to replace.', () => {
      const data: Screen[] = [
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
        }];
      const result = replaceScreenFlow(data, 'next screen');
      expect(JSON.stringify(result)).equal(JSON.stringify(data));
    });

    it('should replace screen flow with matching sequence with new default screen flow', () => {
      const data: Screen[] = [
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
            { resultValue: 'hearing-judge' }
          ]
        },
        {
          screenName: 'hearing-judge',
          navigation: [
            { resultValue: 'hearing-panel' }
          ]
        },
        {
          screenName: 'hearing-panel',
          navigation: [
            { resultValue: 'hearing-timing' }
          ]
        }
      ];

      const result = replaceScreenFlow(data, 'next-screen');
      expect(JSON.stringify(result)).equal(JSON.stringify(newScreenSequence));
    });
  });

  describe('forceDefaultScreenFlow', () => {
    describe('forceDefaultScreenFlow', () => {
      it('should replace the screen flow with the default screen flow when no screenFlow exists', () => {
        const data = {
          screenFlow: null,
          panelRequiredDefault: true
        } as any; // Mocking ServiceHearingValuesModel

        const result = forceDefaultScreenFlow(data);

        expect(result.screenFlow).to.deep.equal(DEFAULT_SCREEN_FLOW_NEW);
      });

      it('should maintiain the screen flow when entered screen flow does not match the pattern screenFlow exists', () => {
        const data = {
          screenFlow: [
            {
              screenName: 'hearing-panel',
              navigation: [
                { resultValue: 'hearing-timing' }
              ]
            }
          ]
        } as any; // Mocking ServiceHearingValuesModel

        const result = forceDefaultScreenFlow(data);

        expect(result.screenFlow).to.be.an('array');
        expect(result.screenFlow[0].screenName).to.equal('hearing-panel');
      });
    });
  });
});

