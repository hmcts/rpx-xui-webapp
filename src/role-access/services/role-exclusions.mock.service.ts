import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { ExclusionStateData, Role, RoleExclusion } from '../models';
import { RoleExclusionsService } from './role-exclusions.service';

export class RoleExclusionsMockService extends RoleExclusionsService {

  public confirmExclusion(exclusionStateData: ExclusionStateData): Observable<string> {
    return of('success');
  }

  public deleteExclusion(deletedExclusion: RoleExclusion): Observable<RoleExclusion> {
    return of({
      id: '1',
      added: new Date(2021, 7, 1),
      name: 'Judge Birch',
      notes: 'this case been remitted from Upper Tribunal and required different judge',
      type: 'Other',
      userType: 'Judicial',
    });
  }

  public getCurrentUserRoleExclusions(): Observable<RoleExclusion[]> {
    return of([
      {
        id: '2',
        added: new Date(2021, 7, 1),
        name: 'Judge Birch',
        notes: 'this case been remitted from Upper Tribunal and required different judge',
        type: 'Other',
        userType: 'Judicial',
      }
    ]);
  }

  public getRolesCategory(): Observable<Role[]> {
    return of([{roleId: 'judicial', roleName: 'Judicial'}]);
  }
}
