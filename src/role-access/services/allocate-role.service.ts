import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllocateRoleStateData } from '../models';

@Injectable({ providedIn: 'root' })
export class AllocateRoleService {
  public static allocateRoleBaseUrl = '/api/role-access/allocate-role';
  constructor(private readonly http: HttpClient) { }

  public confirmAllocation(allocateRoleStateData: AllocateRoleStateData) {
    return this.http.post(`${AllocateRoleService.allocateRoleBaseUrl}/confirm`, allocateRoleStateData);
  }

  public removeAllocation(caseId: string, roleId: string): Observable<any> {
    const body = {caseId, roleId};
    return this.http.post(`${AllocateRoleService.allocateRoleBaseUrl}/delete`, body);
  }

}
