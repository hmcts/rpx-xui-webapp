import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({ providedIn: 'root' })
export class RoleAssignmentService {
  public static allocationsUrl = '/api/role-access';

  public validRoles: Role[];

  constructor(private readonly http: HttpClient) { }

  public getValidRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${RoleAssignmentService.allocationsUrl}/valid-roles/get`);
  }

}
