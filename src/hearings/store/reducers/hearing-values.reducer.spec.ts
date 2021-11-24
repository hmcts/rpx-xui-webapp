import {RequirementType} from '../../models/hearings.enum';
import {ServiceHearingValuesModel} from '../../models/serviceHearingValues.model';
import * as fromHearingValuesActions from '../actions/hearing-values.action';
import * as fromHearingValuesReducer from './hearing-values.reducer';

describe('Hearing Values Reducer', () => {

  describe('Actions', () => {

    describe('Reset action', () => {
      it('should set correct object', () => {
        const initialState = fromHearingValuesReducer.initialHearingValuesState;
        const action = new fromHearingValuesActions.HearingValuesReset();
        const hearingsState = fromHearingValuesReducer.hearingValuesReducer(initialState, action);
        expect(hearingsState).toEqual(initialState);
      });
    });

    describe('Load service hearing values success action', () => {
      it('should set correct object', () => {
        const SERVICE_HEARING_VALUES: ServiceHearingValuesModel = {
          autoListFlag: false,
          hearingType: 'Final',
          caseType: 'Personal Independence Payment',
          caseSubTypes: ['Conditions of Entitlement', 'Good cause', 'Rate of Assessment / Payability Issues - complex'],
          hearingWindow: {
            range: {
              start: '2021-11-23T09:00:00.000+0000',
              end: '2021-11-30T09:00:00.000+0000',
            },
            firstDateTimeMustBe: '',
          },
          duration: 45,
          hearingPriorityType: 'Standard',
          numberOfPhysicalAttendees: 2,
          hearingInWelshFlag: false,
          hearingLocations: [],
          facilitiesRequired: [],
          listingComments: '',
          hearingRequester: '',
          privateHearingRequiredFlag: false,
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
                memberID: '',
                memberType: '',
                requirementType: RequirementType.EXCLUDE,
              },
            ],
            judiciarySpecialisms: [''],
          },
          hearingIsLinkedFlag: false,
          parties: [
            {
              partyName: 'Jane and Smith',
              partyChannel: '',
              unavailability: [
                {
                  start: '2021-12-10T09:00:00.000+0000',
                  end: '2021-12-31T09:00:00.000+0000',
                },
              ],
            },
            {
              partyName: 'DWP',
              partyChannel: '',
              unavailability: [
                {
                  start: '2021-12-20T09:00:00.000+0000',
                  end: '2021-12-31T09:00:00.000+0000',
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
