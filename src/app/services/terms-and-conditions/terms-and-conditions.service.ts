import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TCDocument } from '@hmcts/rpx-xui-common-lib';
import { Observable, of } from 'rxjs';
import { EnvironmentService } from '../../shared/services/environment.service';

@Injectable({
  providedIn: 'root',
})
export class TermsConditionsService {
  constructor(
    private readonly http: HttpClient,
    private readonly environmentService: EnvironmentService
  ) {}
  public getTermsConditions(): Observable<TCDocument> {
    return this.http.get<TCDocument>('api/termsAndConditions');
  }

  public isTermsConditionsFeatureEnabled(): Observable<boolean> {
    return of(Boolean(this.environmentService.get('termsAndConditionsEnabled')));
  }
}
