import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jurisdiction } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';

@Injectable()
export class JurisdictionService {
    constructor(private readonly http: HttpClient) {}

    public getJurisdictions(): Observable<Jurisdiction[]> {
        const headers= new HttpHeaders()
            .set('content-type', 'application/json');
        return this.http.get<Jurisdiction[]>(`/aggregated/caseworkers/:uid/jurisdictions?access=read`, { 'headers': headers });
    }
}
