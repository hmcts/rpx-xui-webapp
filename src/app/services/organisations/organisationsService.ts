import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class OrganisationsService {
    constructor(private readonly http: HttpClient) {}
    public getActiveOrganisations(): Observable<any> {
        return this.http.get<any>(`api/caseshare/orgs`);
    }
}
