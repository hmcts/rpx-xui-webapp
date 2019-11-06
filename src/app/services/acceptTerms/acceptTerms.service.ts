import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AcceptTermsService {
    constructor(private http: HttpClient) {}

    postUserAccepted(userId: string): Observable<boolean> {
        return this.http.post<boolean>(`api/userTermsAndConditions`, {userId});
    }
    getIsUserAccepted(userId: string): Observable<boolean> {
        return this.http.get<boolean>(`api/userTermsAndConditions/${userId}`);
    }
    getTermsAndConditionsContent(): Observable<any> {
        return this.http.get<any>(`api/termsAndConditions`);
    }
}
