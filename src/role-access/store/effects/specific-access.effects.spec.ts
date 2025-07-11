import { TestBed } from '@angular/core/testing';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from 'jasmine-marbles';
import { of } from 'rxjs';
import { SpecificAccessState, SpecificAccessStateData } from '../../models';
import { AccessReason, DurationType } from '../../models/enums';
import { AllocateRoleService } from '../../services';
import * as specificAccessAction from '../actions/specific-access.action';
import { SpecificAccessEffects } from './specific-access.effects';

describe('Specific Access Effects', () => {
  let effects: SpecificAccessEffects;
  let actions$;

  const allocateRoleServiceMock = jasmine.createSpyObj('AllocateRoleService', [
    'specificAccessApproval', 'requestMoreInfoSpecificAccessRequest'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AllocateRoleService,
          useValue: allocateRoleServiceMock
        },
        SpecificAccessEffects,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.inject(SpecificAccessEffects);
  });

  describe('confirmAllocation$', () => {
    it('should return SetSubmissionSuccessPending', () => {
      const period = {
        startDate: new Date(),
        endDate: new Date()
      };
      const specificAccessStateData: SpecificAccessStateData = {
        state: SpecificAccessState.SPECIFIC_ACCESS_DURATION,
        accessReason: AccessReason.APPROVE_REQUEST,
        typeOfRole: { id: 'specific-access-granted', name: 'specific-access-granted' },
        period,
        caseName: 'Example case name',
        actorId: 'N/A',
        requestCreated: null,
        caseId: '1594717367271987',
        taskId: 'd3f939d2-d4f3-11ec-8d51-b6ad61ebbb09',
        requestId: '59bedc19-9cc6-4bff-9f58-041c3ba664a0',
        jurisdiction: 'IA',
        roleCategory: RoleCategory.LEGAL_OPERATIONS,
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
      allocateRoleServiceMock.specificAccessApproval.and.returnValue(of({
      }));
      const action = new specificAccessAction.ApproveSpecificAccessRequest({ specificAccessStateData, period: { startDate: new Date('01-01-2000'), endDate: new Date('01-01-2025') } }); actions$ = hot('-a', { a: action });
      effects.approveSpecificAccessRequest$.subscribe(() => {
        expect(allocateRoleServiceMock.specificAccessApproval).toHaveBeenCalled();
      });
    });

    it('should call requestMoreInformation ', () => {
      const specificAccessState: SpecificAccessStateData = {
        state: SpecificAccessState.SPECIFIC_ACCESS_REVIEW,
        accessReason: AccessReason.REQUEST_MORE_INFORMATION,
        typeOfRole: { id: 'specific-access-denied', name: 'specific-access-denied' },
        caseId: '1613568559071553',
        requestId: 'eb7b412d-9e8e-4e1e-8e6f-ad540d455945',
        taskId: '9b440fc1-d9cb-11ec-a8f0-eef41c565753',
        jurisdiction: 'IA',
        roleCategory: RoleCategory.LEGAL_OPERATIONS,
        requestedRole: 'specific-access-legal-operations',
        person: { id: 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8', name: null, domain: null }
      };
      allocateRoleServiceMock.specificAccessApproval.and.returnValue(of({}));
      const action = new specificAccessAction.RequestMoreInfoSpecificAccessRequest(specificAccessState); actions$ = hot('-a', { a: action });
      effects.approveSpecificAccessRequest$.subscribe(() => {
        expect(allocateRoleServiceMock.requestMoreInformation).toHaveBeenCalled();
      });
    });
  });
});
