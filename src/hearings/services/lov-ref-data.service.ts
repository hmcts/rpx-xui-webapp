import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LovRefDataModel} from '../models/lovRefData.model';

@Injectable({providedIn: 'root'})
export class LovRefDataService {
  public constructor(private readonly http: HttpClient) {
  }

  public getListOfValues(category: string, service: string): Observable<LovRefDataModel[]> {
    return this.http.get<LovRefDataModel[]>(`api/prd/lov/getLovRefData?category=${category}&service=${service}`);
  }
}
