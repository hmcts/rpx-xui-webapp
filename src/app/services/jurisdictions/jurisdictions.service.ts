import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Jurisdiction } from "@hmcts/ccd-case-ui-toolkit";
import { GlobalSearchJurisdiction } from "api/interfaces/globalSearchJurisdictions";
import { Observable } from "rxjs";

@Injectable()
export class JurisdictionsService {
    constructor(private readonly http: HttpClient) {}

    public getJurisdictions(): Observable<Jurisdiction[]> {
        return this.http.get<Jurisdiction[]>(`api/jurisdictions/jurisdictionlist`);
    }

    public getGlobalSearchJurisdictions(): Observable<GlobalSearchJurisdiction[]> {
        return this.http.get<GlobalSearchJurisdiction[]>(`api/globalsearch/services`);
    }
}
