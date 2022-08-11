import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AllocateRoleService } from '.';
import { Actions, AllocateRoleState, AllocateRoleStateData, AllocateTo, DurationOfRole, RoleCategory, RolesByService } from '../models';
import { CaseRoleDetails } from '../models/case-role-details.interface';

const mockRoles = [{ roleId: '1', roleName: 'Role 1' },
  { roleId: '2', roleName: 'Role 2' },
  { roleId: '3', roleName: 'Role 3' },
  { roleId: '4', roleName: 'Role 4' }];

const mockRolesByService = [{service: 'IA',
 roles: [{ roleId: '1', roleName: 'Role 1' },
  { roleId: '2', roleName: 'Role 2' },
  { roleId: '3', roleName: 'Role 3' }]},
{service: 'SSCS', roles: {
  roleId: '4', roleName: 'Role 4'
}}];

describe('AllocateRoleService', () => {
  let roleAssignmentService: AllocateRoleService;
  let sessionStorageService: any;
  let mockHttp: any;
  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    sessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem', 'setItem']);
    roleAssignmentService = new AllocateRoleService(mockHttp, sessionStorageService);
  });
  it('should be able to set judicial and legal ops roles', () => {
    mockHttp.post.and.returnValue(of(mockRolesByService));
    roleAssignmentService.getValidRoles(['IA']).subscribe((roles) => {
      expect(roles.length).toBe(4);
      expect(roles).toEqual(mockRoles);
    });
    expect(mockHttp.post).toHaveBeenCalledWith('/api/role-access/allocate-role/valid-roles', {serviceIds: ['IA']});
  });

  it('should be able to set judicial and legal ops roles from session storage', () => {
    sessionStorageService.getItem.and.returnValue(JSON.stringify(mockRoles));
    mockHttp.post.and.returnValue(of(mockRolesByService));
    roleAssignmentService.getValidRoles(['IA']).subscribe(res => {
      expect(res).toEqual(mockRoles);
    });
  });

  describe('confirmAllocation', () => {
    const STATE_DATA: AllocateRoleStateData = {
      caseId: '111111',
      jurisdiction: 'IA',
      state: AllocateRoleState.CHOOSE_ROLE,
      typeOfRole: null,
      allocateTo: AllocateTo.RESERVE_TO_ME,
      person: null,
      durationOfRole: DurationOfRole.SEVEN_DAYS,
      action: Actions.Allocate,
      period: null
    };
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          StoreModule.forRoot({}),
        ],
        providers: [
          AllocateRoleService,
        ]
      });
    });

    it('should confirm allocation', inject([HttpTestingController, AllocateRoleService], (httpMock: HttpTestingController, service: AllocateRoleService) => {
      service.confirmAllocation(STATE_DATA).subscribe(response => {
        expect(response).toBeNull();
      });

      const req = httpMock.expectOne('/api/role-access/allocate-role/confirm');
      expect(req.request.method).toEqual('POST');
      req.flush(null);
    }));

    it('should confirm reallocation', inject([HttpTestingController, AllocateRoleService], (httpMock: HttpTestingController, service: AllocateRoleService) => {
      const CURRENT_STATE = { ...STATE_DATA, action: Actions.Reallocate };
      service.confirmAllocation(CURRENT_STATE).subscribe(response => {
        expect(response).toBeNull();
      });
      const req = httpMock.expectOne('/api/role-access/allocate-role/reallocate');
      expect(req.request.method).toEqual('POST');
      req.flush(null);
    }));

    it('should remove allocation', inject([HttpTestingController, AllocateRoleService], (httpMock: HttpTestingController, service: AllocateRoleService) => {
      service.removeAllocation('111111').subscribe(response => {
        expect(response).toBeNull();
      });
      const req = httpMock.expectOne('/api/role-access/allocate-role/delete');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ assigmentId: '111111' });
      req.flush(null);
    }));

    it('should get case roles user details', inject([HttpTestingController, AllocateRoleService], (httpMock: HttpTestingController, service: AllocateRoleService) => {
      const data: CaseRoleDetails[] = [
        {
          idam_id: '519e0c40-d30e-4f42-8a4c-2c79838f0e4e',
          sidam_id: '519e0c40-d30e-4f42-8a4c-2c79838f0e4e',
          known_as: 'Tom',
          surname: 'Cruz',
          full_name: 'Tom Cruz',
          email_id: '330085EMP-@ejudiciary.net',
        }
      ];
      mockHttp.post.and.returnValue(of(data));

      const caseRoles: any[] = [
        {
          actions: [
            {
              id: 'reallocate',
              title: 'Reallocate'
            },
            {
              id: 'remove',
              title: 'Remove Allocation'
            }
          ],
          actorId: '519e0c40-d30e-4f42-8a4c-2c79838f0e4e',
          end: null,
          id: '13daef07-dbd2-4106-9099-711c4505f04f',
          location: null,
          roleCategory: RoleCategory.JUDICIAL,
          roleName: 'hearing-judge',
          start: '2021-12-09T00:00:00Z'
        }
      ];
      service.getCaseRolesUserDetails(caseRoles, ['IA']).subscribe(response => {
        expect(response.length).toBe(1);
        expect(response).toEqual(data);
      });
    }));
  });
});

