import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExclusionStateData } from '../models';
import { RoleExclusion } from '../models/role-exclusion.model';
import { Role } from '../models/role.model';

@Injectable({ providedIn: 'root' })
export class RoleExclusionsService {
  public static exclusionsUrl = '/api/user/exclusions';
  constructor(private readonly http: HttpClient) { }

  public getCurrentUserRoleExclusions(): Observable<RoleExclusion[]> {
    return this.http.get<RoleExclusion[]>(RoleExclusionsService.exclusionsUrl);
  }

  public getRolesCategory(): Observable<Role[]> {
    return this.http.get<Role[]>('workallocation2/exclusion/rolesCategory');
  }

  public confirmExclusion(exclusionStateData: ExclusionStateData) {
    return this.http.post(`${RoleExclusionsService.exclusionsUrl}/confirm`, exclusionStateData);
  }
}
