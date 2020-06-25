import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedCase } from '../../../cases/models/case-share/case-share.module';
import { UserDetails } from '../../../cases/models/user-details/user-details.module';

@Injectable()
export class CaseShareService {
    constructor(private readonly http: HttpClient) {}

    public getShareCases(shareCases: SharedCase[]): Observable<SharedCase[]> {
        return this.http.get<SharedCase[]>(`api/caseshare/cases`);
    }
    public getUsersFromOrg(orgId: string, searchText: string): Observable<UserDetails[]> {
        return this.http.get<UserDetails[]>(`api/caseshare/orgs/${orgId}?q=${searchText}`);
    }
}
