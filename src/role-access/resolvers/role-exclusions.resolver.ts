import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { RoleExclusion } from '../models';
import { RoleExclusionsService } from '../services';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../work-allocation-2/utils';

@Injectable({ providedIn: 'root' })
export class RoleExclusionsResolver implements Resolve<RoleExclusion[]> {
  constructor(
    private readonly service: RoleExclusionsService,
    private readonly router: Router,
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RoleExclusion[]> {
    return this.service.getCurrentUserRoleExclusions().pipe(
      catchError(error => {
        handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
        return EMPTY;
      })
    );
  }
}
