import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../work-allocation-2/utils';
import { Role } from '../models';
import { AllocateRoleService } from '../services';

@Injectable({ providedIn: 'root' })
export class RoleAllocationsResolver implements Resolve<Role[]> {
  constructor(
    private readonly service: AllocateRoleService,
    private readonly router: Router,
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Role[]> {
    return this.service.getValidRoles().pipe(
      catchError(error => {
        handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
        return EMPTY;
      })
    );
  }
}
