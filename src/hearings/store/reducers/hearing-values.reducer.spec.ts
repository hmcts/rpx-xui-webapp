import { HearingValuesStateData } from '../../../hearings/models/hearingValuesStateData';
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
              partyRole: 'appellant',
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
              partyRole: 'claimant',
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
                partyID: 'P1',
                partyName: 'Jane and Smith',
                flagId: 'Language Interpreter',
                flagDescription: 'Spanish interpreter required',
                flagStatus: 'ACTIVE',
              },
              {
                partyID: 'P2',
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

      it('should call error response action', () => {
        const initialHearingValuesState: HearingValuesStateData = {
          serviceHearingValuesModel: null,
          lastError: {
            status: 403,
            errors: null,
            message: 'Http failure response: 403 Forbidden'
          },
        };
        const action = new fromHearingValuesActions.LoadHearingValuesFailure(initialHearingValuesState.lastError);
        const hearingsState = fromHearingValuesReducer.hearingValuesReducer(initialHearingValuesState, action);
        expect(hearingsState).toEqual(initialHearingValuesState);
      });
    });

    describe('reset hearing actuals last error action', () => {
      it('should set correct object', () => {
        const initialHearingValuesState: HearingValuesStateData = {
          serviceHearingValuesModel: null,
          lastError: {
            status: 403,
            errors: null,
            message: 'Http failure response: 403 Forbidden'
          },
        };
        const action = new fromHearingValuesActions.ResetHearingValuesLastError();
        const hearingsState = fromHearingValuesReducer.hearingValuesReducer(initialHearingValuesState, action);
        expect(hearingsState.lastError).toEqual(null);
      });
    });
  });
});
