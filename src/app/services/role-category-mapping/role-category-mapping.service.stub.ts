import { Observable, of } from "rxjs";
import { UserRole } from "src/app/models/user-details.model";

export class RoleCategoryMappingServiceStub {
    public isJudicialCategory = (userRoles$: Observable<string[]>): Observable<boolean>  => of(true);
    public isLegalOpsCategory = (userRoles$: Observable<string[]>): Observable<boolean>  => of(true);
    public isJudicialOrLegalOpsCategory = (userRoles$: Observable<string[]>): Observable<string>  => of(UserRole.Judicial);
  }
