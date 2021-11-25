import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AllocateRoleService } from '.';
import { Actions, AllocateRoleState, AllocateTo, DurationOfRole } from '../models';

const mockRoles = [{roleId: '1', roleName: 'Role 1'},
  {roleId: '2', roleName: 'Role 2'},
  {roleId: '3', roleName: 'Role 3'}];

describe('AllocateRoleService', () => {
  let roleAssignmentService: AllocateRoleService;
  let sessionStorageService: any;
  let mockHttp: any;
  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    sessionStorageService = jasmine.createSpyObj('SessionStorageService', ['getItem']);
    roleAssignmentService = new AllocateRoleService(mockHttp, sessionStorageService);
  });
  it('should be able to set judicial and legal ops roles', () => {
    mockHttp.get.and.returnValue(of(mockRoles));
    roleAssignmentService.getValidRoles();
    expect(mockHttp.get).toHaveBeenCalledWith('/api/role-access/allocate-role/valid-roles');
  });

  describe('confirmAllocation', () => {
    const STATE_DATA = {
      caseId: '111111',
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
      const CURRENT_STATE = {...STATE_DATA, action: Actions.Reallocate};
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
      expect(req.request.body).toEqual({assigmentId: '111111'});
      req.flush(null);
    }));
  });
});

