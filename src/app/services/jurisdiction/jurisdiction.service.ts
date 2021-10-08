import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';

@Injectable()
export class JurisdictionService {
    constructor(private readonly http: HttpClient) {}

    public getJurisdictions(): Observable<Jurisdiction[]> {
        return this.http.get<Jurisdiction[]>(`api/jurisdictions`);
    }
}
