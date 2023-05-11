import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExclusionStateData, Role, RoleExclusion } from '../models';

@Injectable({ providedIn: 'root' })
export class RoleExclusionsService {
  public static exclusionsUrl = '/api/role-access/exclusions';
  constructor(private readonly http: HttpClient) {}

  public getCurrentUserRoleExclusions(caseId: string, jurisdiction: string, caseType: string, exclusionId?: string): Observable<RoleExclusion[]> {
    return this.http.post<RoleExclusion[]>(`${RoleExclusionsService.exclusionsUrl}/post`, { caseId, jurisdiction, caseType, exclusionId });
  }

  public getRolesCategory(): Observable<Role[]> {
    return this.http.get<Role[]>('workallocation/exclusion/rolesCategory');
  }

  public confirmExclusion(exclusionStateData: ExclusionStateData): Observable<string> {
    return this.http.post<string>(`${RoleExclusionsService.exclusionsUrl}/confirm`, exclusionStateData);
  }

  public deleteExclusion(deletedExclusion: RoleExclusion): Observable<RoleExclusion> {
    return this.http.post<RoleExclusion>(`${RoleExclusionsService.exclusionsUrl}/delete`, { roleExclusion: deletedExclusion });
  }
}
