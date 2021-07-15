import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleExclusion } from '../models/role-exclusions/role-exclusion.model';

@Injectable()
export class RoleExclusionsService {
    public static exclusionsUrl = '/api/user/exclusions';
    constructor(private http: HttpClient) { }

    public getCurrentUserRoleExclusions(): Observable<RoleExclusion[]> {
        return this.http.get<any>(RoleExclusionsService.exclusionsUrl);
    }
}
