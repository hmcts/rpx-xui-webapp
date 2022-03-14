import {MemberType, PartyType, RequirementType} from '../../models/hearings.enum';
import {ServiceHearingValuesModel} from '../../models/serviceHearingValues.model';
import * as fromHearingValuesActions from '../actions/hearing-values.action';
import * as fromHearingValuesReducer from './hearing-values.reducer';

describe('Hearing Values Reducer', () => {
  describe('Actions', () => {
    describe('Reset action', () => {
      it('should set correct object', () => {
        const initialState = fromHearingValuesReducer.initialHearingValuesState;
        const action = new fromHearingValuesActions.ResetHearingValues();
        const hearingsState = fromHearingValuesReducer.hearingValuesReducer(initialState, action);
        expect(hearingsState).toEqual(initialState);
      });
    });

    describe('Load service hearing values success action', () => {
      it('should set correct object', () => {
        const SERVICE_HEARING_VALUES: ServiceHearingValuesModel = {
          caseName: 'Jane Smith vs DWP',
          autoListFlag: false,
          hearingType: 'Final',
          caseType: 'Personal Independence Payment',
          caseSubTypes: ['Conditions of Entitlement', 'Good cause', 'Rate of Assessment / Payability Issues - complex'],
          hearingWindow: {
            hearingWindowDateRange: {
              hearingWindowStartDateRange: '2021-11-23T09:00:00.000+0000',
              hearingWindowEndDateRange: '2021-11-30T09:00:00.000+0000',
            },
            hearingWindowFirstDate: '',
          },
          duration: 45,
          hearingPriorityType: 'standard',
          numberOfPhysicalAttendees: 2,
          hearingInWelshFlag: false,
          hearingLocations: [],
          facilitiesRequired: [],
          listingComments: '',
          hearingRequester: '',
          privateHearingRequiredFlag: false,
          panelRequirements: null,
          leadJudgeContractType: '',
          judiciary: {
            roleType: [''],
            authorisationTypes: [''],
            authorisationSubType: [''],
            panelComposition: [{
              memberType: '',
              count: 1,
            }],
            judiciaryPreferences: [
              {
                memberID: 'p1000000',
                memberType: MemberType.JUDGE,
                requirementType: RequirementType.EXCLUDE,
              },
            ],
            judiciarySpecialisms: [''],
          },
          hearingIsLinkedFlag: false,
          parties: [
            {
              partyID: 'P1',
              partyName: 'Jane and Smith',
              partyType: PartyType.IND,
              partyChannel: 'byVideo',
              unavailabilityRanges: [
                {
                  unavailableFromDate: '2021-12-10T09:00:00.000+0000',
                  unavailableToDate: '2021-12-31T09:00:00.000+0000',
                },
              ],
            },
            {
              partyID: 'P2',
              partyName: 'DWP',
              partyType: PartyType.ORG,
              partyChannel: 'byVideo',
              unavailabilityRanges: [
                {
                  unavailableFromDate: '2021-12-20T09:00:00.000+0000',
                  unavailableToDate: '2021-12-31T09:00:00.000+0000',
                },
              ],
            }],
          caseFlags: {
            flags: [
              {
                partyName: 'Jane and Smith',
                flagId: 'Language Interpreter',
                flagDescription: 'Spanish interpreter required',
                flagStatus: 'ACTIVE',
              },
              {
                partyName: 'DWP',
                flagId: 'case flag 1',
                flagDescription: 'case flag 1 description',
                flagStatus: 'ACTIVE',
              },
            ],
            flagAmendURL: '/',
          },
          screenFlow: [
          ],
          vocabulary: [
            {
              word1: '',
            },
          ],
        };
        const action = new fromHearingValuesActions.LoadHearingValuesSuccess(SERVICE_HEARING_VALUES);
        const hearingsState = fromHearingValuesReducer.hearingValuesReducer(fromHearingValuesReducer.initialHearingValuesState, action);
        expect(hearingsState.serviceHearingValuesModel).toEqual(SERVICE_HEARING_VALUES);
      });
    });
  });
});
