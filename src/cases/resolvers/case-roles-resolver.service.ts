import { EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CaseRole } from 'api/workAllocation2/interfaces/caseRole';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../work-allocation-2/utils';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CaseRolesResolverService implements Resolve<CaseRole[]> {
  public static CASE_ROLES_URL: string = '/workallocation2/roles';

  constructor(private readonly http: HttpClient, private readonly router: Router) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CaseRole[]> {
    const caseId = route.paramMap.get('cid');
    return this.http.get<CaseRole[]>(`${CaseRolesResolverService.CASE_ROLES_URL}/${caseId}`)
      .pipe(
        first(),
        catchError(error => {
          handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
          return EMPTY;
        })
      );
  }
}
