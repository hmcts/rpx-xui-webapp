import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of } from 'rxjs';
import { hot } from 'jasmine-marbles';

import { SpecificAccessState, SpecificAccessStateData } from '../../models';
import { AccessReason, DurationType } from '../../models/enums';
import { AllocateRoleService } from '../../services';
import * as specificAccessAction from '../actions/specific-access.action';
import { SpecificAccessEffects } from './specific-access.effects';

describe('Specific Access Effects', () => {
  
  let effects: SpecificAccessEffects;
  let actions$;

  const allocateRoleServiceMock = jasmine.createSpyObj('AllocateRoleService', [
    'specificAccessApproval'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AllocateRoleService,
          useValue: allocateRoleServiceMock,
        },
        SpecificAccessEffects,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.get(SpecificAccessEffects);

  });

  describe('confirmAllocation$', () => {
    it('should return SetSubmissionSuccessPending', () => {
      const period = {
        startDate: new Date(),
        endDate: new Date()
      }
      const specificAccessState: SpecificAccessStateData = {
        state: SpecificAccessState.SPECIFIC_ACCESS_DURATION,
        accessReason: AccessReason.APPROVE_REQUEST,
        typeOfRole: {id: 'specific-access-granted', name: 'specific-access-granted'},
        period,
        caseId: '1594717367271987',
        taskId: 'd3f939d2-d4f3-11ec-8d51-b6ad61ebbb09',
        requestId: '59bedc19-9cc6-4bff-9f58-041c3ba664a0',
        jurisdiction: 'IA',
        roleCategory: 'LEGAL_OPERATIONS',
        requestedRole: 'specific-access-legal-ops',
        person: {id: 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8', name: null, domain: null},
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
      }
      allocateRoleServiceMock.specificAccessApproval.and.returnValue(of({
      }));
      const action = new specificAccessAction.ApproveSpecificAccessRequest(specificAccessState); actions$ = hot('-a', { a: action });
      effects.approveSpecificAccessRequest$.subscribe(() => {
          expect(allocateRoleServiceMock.specificAccessApproval).toHaveBeenCalled();
      });
    });
  });

});
