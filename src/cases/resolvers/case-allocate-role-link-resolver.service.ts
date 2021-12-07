import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, first, tap } from 'rxjs/operators';
import { handleFatalErrors, WILDCARD_SERVICE_DOWN } from '../../work-allocation-2/utils';

@Injectable({
  providedIn: 'root'
})
export class CaseAllocateRoleLinkResolverService implements Resolve<boolean> {
  private static CASE_ALLOCATE_ROLE_LINK_URL: string = '/workallocation2/roles';
  private caseId: string = null;
  private showAllocateRoleLink: boolean = null;

  constructor(private readonly http: HttpClient, private readonly router: Router) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const caseId = route.paramMap.get('cid');
    if (caseId !== null && this.caseId === caseId) {
      return of(this.showAllocateRoleLink);
    }
    this.caseId = caseId;
    return this.http.get<boolean>(`${CaseAllocateRoleLinkResolverService.CASE_ALLOCATE_ROLE_LINK_URL}/${caseId}/show-allocate-role-link`)
      .pipe(
        first(),
        tap((value) => this.showAllocateRoleLink = value),
        catchError(error => {
          handleFatalErrors(error.status, this.router, WILDCARD_SERVICE_DOWN);
          return EMPTY;
        })
      );
  }
}
