import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, AllocateRoleStateData, Role } from '../models';

@Injectable({ providedIn: 'root' })
export class AllocateRoleService {
  public static allocateRoleBaseUrl = '/api/role-access/allocate-role';
  constructor(private readonly http: HttpClient) { }

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
    return this.http.get<Role[]>(`${AllocateRoleService.allocateRoleBaseUrl}/valid-roles`);
  }

}
