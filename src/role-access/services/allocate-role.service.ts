import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from '../../app/services';
import { Actions, AllocateRoleStateData, CaseRole, Role } from '../models';

@Injectable({ providedIn: 'root' })
export class AllocateRoleService {
  public static allocateRoleBaseUrl = '/api/role-access/allocate-role';
  public static roleUrl = '/api/role-access/roles';
  public backUrl: string;
  constructor(private readonly http: HttpClient, private readonly sessionStorageService: SessionStorageService) { }

  public confirmAllocation(allocateRoleStateData: AllocateRoleStateData) {
    const action: Actions = allocateRoleStateData.action;
    if (action === Actions.Allocate) {
      return this.http.post(`${AllocateRoleService.allocateRoleBaseUrl}/confirm`, allocateRoleStateData);
    }
    if (action === Actions.Reallocate) {
      return this.http.post(`${AllocateRoleService.allocateRoleBaseUrl}/reallocate`, allocateRoleStateData);
    }
  }

  public removeAllocation(assigmentId: string): Observable<any> {
    const body = {assigmentId};
    return this.http.post(`${AllocateRoleService.allocateRoleBaseUrl}/delete`, body);
  }

  public getValidRoles(): Observable<Role[]> {
    if (this.sessionStorageService.getItem('AllRoles')) {
      const roles = JSON.parse(this.sessionStorageService.getItem('AllRoles'));
      return of(roles as Role[]);
    }
    return this.http.get<Role[]>(`${AllocateRoleService.allocateRoleBaseUrl}/valid-roles`).pipe(
        tap(roles => this.sessionStorageService.setItem('AllRoles', JSON.stringify(roles)))
    );
  }

  public getCaseRoles(caseId: string, jurisdiction: string, caseType: string, assignmentId?: string): Observable<CaseRole[]> {
    return this.http.post<CaseRole[]>(`${AllocateRoleService.roleUrl}/post`, {caseId, jurisdiction, caseType, assignmentId});
  }

  public getCaseRolesUserDetails(caseRoles: CaseRole[]): Observable<CaseRole[]> {
    const userIds = caseRoles.map(caseRole => caseRole.id);
    return this.http.post<CaseRole[]>(`${AllocateRoleService.roleUrl}/getJudicialUsers`, {userIds});
  }
}
