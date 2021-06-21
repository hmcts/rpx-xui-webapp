import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person, SearchOptions } from '../models/dtos';

@Injectable()
export class FindAPersonService {
    constructor(private readonly http: HttpClient) {}

    public find(searchOptions: SearchOptions): Observable<Person[]> {
        return this.http.post<Person[]>('/workallocation2/findPerson', { searchOptions });
    }
}
