import { RouterStateSnapshot } from '@angular/router';
import { of, throwError } from 'rxjs';
import { isEmpty } from 'rxjs/operators';
import { RoleExclusion } from '../models';
import { RoleExclusionsResolver } from './role-exclusions.resolver';

describe('Role Exclusions Resolver', () => {

  let mockService: any;
  let mockRouter: any;
  let roleExclusionsResolver: RoleExclusionsResolver;
  let route: any;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('RoleExclusionsService', ['getCurrentUserRoleExclusions']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    roleExclusionsResolver = new RoleExclusionsResolver(mockService, mockRouter);
    route = jasmine.createSpyObj('Route', ['']);
  });

  it('should resolve on success', () => {
    mockService.getCurrentUserRoleExclusions.and.returnValue(of({} as RoleExclusion[]));

    const roleExclusions$ = roleExclusionsResolver.resolve(route, {} as RouterStateSnapshot);
    roleExclusions$.subscribe(roleExclusions => {
      expect(roleExclusions).toEqual({} as RoleExclusion[]);
    });
  });

  it('should return an empty observable on failure', () => {
    mockService.getCurrentUserRoleExclusions.and.returnValue(throwError({ status: 500 }));

    const roleExclusions$ = roleExclusionsResolver.resolve(route, {} as RouterStateSnapshot);
    roleExclusions$.pipe(isEmpty()).subscribe(res => {
      expect(res).toEqual(true);
    });
  });
});
