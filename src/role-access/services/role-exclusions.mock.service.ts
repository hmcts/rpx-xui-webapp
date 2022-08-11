import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { ExclusionStateData, Role, RoleExclusion } from '../models';
import { RoleExclusionsService } from './role-exclusions.service';

export class RoleExclusionsMockService extends RoleExclusionsService {

  public confirmExclusion(exclusionStateData: ExclusionStateData): Observable<string> {
    return of('success');
  }

  public getRolesCategory(): Observable<Role[]> {
    return of([{roleId: 'judicial', roleName: 'Judicial'}]);
  }
}
