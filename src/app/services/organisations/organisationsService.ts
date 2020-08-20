import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organisation } from '../../../cases/store/index';

@Injectable({
    providedIn: 'root'
  })

export class OrganisationsService {
    public url: string = `api/caseshare/orgs`;
    constructor(private readonly http: HttpClient) {}
    public getActiveOrganisations(): Observable<Organisation[]> {
        return this.http.get<any>(this.url);
    }
}
