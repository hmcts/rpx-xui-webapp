import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LovRefDataModel } from '../models/lovRefData.model';

@Injectable({ providedIn: 'root' })
export class LovRefDataService {
  public constructor(private readonly http: HttpClient) {}

  public getListOfValues(category: string, service: string, isChildRequired: boolean = false): Observable<LovRefDataModel[]> {
    const options = {
      params: new HttpParams()
        .set('categoryId', category)
        .set('serviceId', service)
        .set('isChildRequired', isChildRequired ? 'Y' : 'N')
    };
    return this.http.get<LovRefDataModel[]>('api/prd/lov/getLovRefData', options);
  }
}
