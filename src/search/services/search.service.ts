import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SearchResult } from '../models/search-result.model';

@Injectable({ providedIn: 'root' })
export class SearchService {
	constructor(private readonly http: HttpClient) { }

	public getResults(): Observable<SearchResult> {
		return this.http.get<SearchResult>('');
	}
}
