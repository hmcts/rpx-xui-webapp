import { RoleCategory, SpecificAccessFormData, SpecificAccessMoreInformationForm, SpecificAccessState, SpecificAccessStateData } from '../../models';
import { AccessReason, DurationType } from '../../models/enums';
import * as fromActions from '../actions/specific-access.action';
import * as fromReducer from './specific-access.reducer';

describe('Specific Access Reducer', () => {
  describe('Actions', () => {
    describe('Change Navigation action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.specificAccessInitialState;
        const action = new fromActions.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_REVIEW);
        const specificAccessState = fromReducer.specificAccessReducer(initialState, action);
        expect(specificAccessState.state).toEqual(SpecificAccessState.SPECIFIC_ACCESS_REVIEW);
      });

      it('should set correct object', () => {
        const initialState = fromReducer.specificAccessInitialState;
        const specificAccessFormData: SpecificAccessFormData = {
          specificAccessDurationForm: {
            selectedDuration: {},
            selectedOption: 1
          }
        };
        const action = new fromActions.SetSpecificAccessFormData(specificAccessFormData);
        const specificAccessState = fromReducer.specificAccessReducer(initialState, action);
        expect(specificAccessState.specificAccessFormData).toEqual(specificAccessFormData);
      });

      it('should set correct object', () => {
        const initialState = fromReducer.specificAccessInitialState;
        const specificAccessMoreInformationForm: SpecificAccessMoreInformationForm = {
          InfoText: 'test text'
        };
        const action = new fromActions.SetSpecificAccessInfoFormData(specificAccessMoreInformationForm);
        const specificAccessState = fromReducer.specificAccessReducer(initialState, action);
        expect(specificAccessState.SpecificAccessMoreInformationFormData).toEqual(specificAccessMoreInformationForm);
      });

      it('should set correct object', () => {
        const period = {
          startDate: new Date(),
          endDate: new Date()
        };
        const specificAccessStateData: SpecificAccessStateData = {
          state: SpecificAccessState.SPECIFIC_ACCESS_DURATION,
          accessReason: AccessReason.APPROVE_REQUEST,
          typeOfRole: { id: 'specific-access-granted', name: 'specific-access-granted' },
          period,
          caseName: 'Example name',
          actorId: 'N/A',
          requestCreated: null,
          caseId: '1594717367271987',
          taskId: 'd3f939d2-d4f3-11ec-8d51-b6ad61ebbb09',
          requestId: '59bedc19-9cc6-4bff-9f58-041c3ba664a0',
          jurisdiction: 'IA',
          roleCategory: 'LEGAL_OPERATIONS',
          requestedRole: 'specific-access-legal-ops',
          person: { id: 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8', name: null, domain: null },
          specificAccessFormData: {
            specificAccessDurationForm: {
              selectedOption: DurationType.SEVEN_DAYS,
              selectedDuration: {
                startDate: {
                  day: 11,
                  month: 11,
                  year: 2024
                },
                endDate: {
                  day: 11,
                  month: 11,
                  year: 2024
                }
              }
            }
          }
        };
        const action = new fromActions.ApproveSpecificAccessRequest({ specificAccessStateData, period });
        const specificAccessState = fromReducer.specificAccessReducer(specificAccessStateData, action);
        expect(specificAccessState).toEqual(specificAccessStateData);
      });
    });

    describe('Set Initial Data action', () => {
      it('should set correct object', () => {
        const initialState = fromReducer.specificAccessInitialState;
        const specificAccessStateData = {
          state: SpecificAccessState.SPECIFIC_ACCESS_REVIEW,
          accessReason: null,
          specificAccessReason: null,
          caseName: 'Example name',
          actorId: 'N/A',
          requestCreated: null,
          caseId: '1594717367271987',
          taskId: 'd3f939d2-d4f3-11ec-8d51-b6ad61ebbb09',
          requestId: '59bedc19-9cc6-4bff-9f58-041c3ba664a0',
          jurisdiction: 'IA',
          roleCategory: RoleCategory.LEGAL_OPERATIONS,
          requestedRole: 'specific-access-legal-ops'
        };
        const action: fromActions.SpecificAccessAction = { type: fromActions.SpecificAccessActionTypes.SET_SPECIFIC_ACCESS_INITIAL_DATA, payload: specificAccessStateData };
        const specificAccessState = fromReducer.specificAccessReducer(initialState, action);
        expect(specificAccessState.state).toEqual(SpecificAccessState.SPECIFIC_ACCESS_REVIEW);
      });

      it('should set correct object for RequestMoreInfoSpecificAccessRequest', () => {
        const specificAccessData: SpecificAccessStateData = {
          state: SpecificAccessState.SPECIFIC_ACCESS_REVIEW,
          accessReason: AccessReason.REQUEST_MORE_INFORMATION,
          typeOfRole: { id: 'specific-access-denied', name: 'specific-access-denied' },
          caseId: '1613568559071553',
          requestId: 'eb7b412d-9e8e-4e1e-8e6f-ad540d455945',
          taskId: '9b440fc1-d9cb-11ec-a8f0-eef41c565753',
          jurisdiction: 'IA',
          roleCategory: 'LEGAL_OPERATIONS',
          requestedRole: 'specific-access-legal-operations',
          person: { id: 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8', name: null, domain: null }
        };
        const action = new fromActions.RequestMoreInfoSpecificAccessRequest(specificAccessData);
        const specificAccessState = fromReducer.specificAccessReducer(specificAccessData, action);
        expect(specificAccessState).toEqual(specificAccessData);
      });
    });
  });
});
