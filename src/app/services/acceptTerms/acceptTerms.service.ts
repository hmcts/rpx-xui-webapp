import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AcceptTermsService {
  constructor(private readonly http: HttpClient) {}

  public postUserAccepted(userId: string): Observable<boolean> {
    return this.http.post<boolean>('api/userTermsAndConditions', { userId });
  }

  public getIsUserAccepted(userId: string): Observable<boolean> {
    return this.http.get<boolean>(`api/userTermsAndConditions/${userId}`);
  }

  public getTermsAndConditionsContent(): Observable<any> {
    return this.http.get<any>('api/termsAndConditions');
  }
}
