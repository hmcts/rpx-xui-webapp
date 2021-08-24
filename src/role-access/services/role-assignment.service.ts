import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';

@Injectable({ providedIn: 'root' })
export class RoleAssignmentService {
  public static allocationsUrl = '/api/role-assignment';

  public judicialRoles: Role[];
  public legalOpsRoles: Role[];

}
