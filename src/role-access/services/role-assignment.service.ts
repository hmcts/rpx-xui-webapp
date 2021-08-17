import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Role } from '../models/role.model';

@Injectable({ providedIn: 'root' })
export class RoleAssignmentService {
  public static allocationsUrl = '/api/role-assignment';

  public judicialRoles: Role[];
  public legalOpsRoles: Role[];
  constructor(private readonly http: HttpClient) { }

  public setRoleAllocations(): void {
    this.http.get<Role[]>(`${RoleAssignmentService.allocationsUrl}/judiciary/get`).pipe(first()).subscribe(roles => {this.judicialRoles = roles});
    this.http.get<Role[]>(`${RoleAssignmentService.allocationsUrl}/legal-ops/get`).pipe(first()).subscribe(roles => {this.legalOpsRoles = roles});
  }

}
