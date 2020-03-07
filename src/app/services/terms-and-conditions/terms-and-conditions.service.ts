import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TCDocument } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TermsConditionsService {
    constructor(private readonly http: HttpClient) {}
    private readonly configuration = 'termsAndConditionsEnabled';
    public getTermsConditions(): Observable<TCDocument> {
        return this.http.get<TCDocument>(`api/termsAndConditions`);
    }

    public isTermsConditionsFeatureEnabled(): Observable<boolean> {
        return this.http.get<boolean>(`api/configuration?configurationKey=${this.configuration}`);
    }
}
