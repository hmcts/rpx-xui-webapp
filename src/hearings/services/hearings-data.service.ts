import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefDataModel } from 'api/hearings/models/refData.model';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class HearingsDataService {
  public constructor(private readonly http: HttpClient) { }


  public getPriorities(): Observable<RefDataModel[]> {
    return this.http.get<RefDataModel[]>(`api/hearings/getRefData?category=Priority&service=SSCS`);
  }
}
