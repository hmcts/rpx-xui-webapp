import { RouterStateSnapshot } from '@angular/router';
import { of, throwError } from 'rxjs';
import { isEmpty } from 'rxjs/operators';
import { Role } from '../models';
import { RoleAllocationsResolver } from './role-allocations.resolver';

describe('Role Allocations Resolver', () => {

  let mockService: any;
  let mockRouter: any;
  let roleAllocationsResolver: RoleAllocationsResolver;
  let route: any;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('RoleAssignmentService', ['getValidRoles']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    roleAllocationsResolver = new RoleAllocationsResolver(mockService, mockRouter);
    route = jasmine.createSpyObj('Route', ['']);
  });

  it('should resolve on success', () => {
    mockService.getValidRoles.and.returnValue(of({} as Role[]));

    const roles$ = roleAllocationsResolver.resolve(route, {} as RouterStateSnapshot);
    roles$.subscribe(roles => {
      expect(roles).toEqual({} as Role[]);
    });
  });

  it('should return an empty observable on failure', () => {
    mockService.getValidRoles.and.returnValue(throwError({ status: 500 }));

    const roles$ = roleAllocationsResolver.resolve(route, {} as RouterStateSnapshot);
    roles$.pipe(isEmpty()).subscribe(res => {
      expect(res).toEqual(true);
    });
  });
});
