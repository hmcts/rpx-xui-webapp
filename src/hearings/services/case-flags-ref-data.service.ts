import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CaseFlagReferenceModel} from '../models/caseFlagReference.model';

@Injectable({ providedIn: 'root' })
export class CaseFlagsRefDataService {
  public constructor(private readonly http: HttpClient) { }

  public getCaseFlagsRefData(): Observable<CaseFlagReferenceModel[]> {
    return this.http.get<CaseFlagReferenceModel[]>(`api/hearings/getCaseFlagRefData`);
  }
}
