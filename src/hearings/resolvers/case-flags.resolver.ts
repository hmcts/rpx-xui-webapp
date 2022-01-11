import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {CaseFlagReferenceModel} from '../models/caseFlagReference.model';
import {CaseFlagsRefDataService} from '../services/case-flags-ref-data.service';

@Injectable({
  providedIn: 'root'
})
export class CaseFlagsResolver implements Resolve<CaseFlagReferenceModel[]> {

  constructor(
    private readonly caseFlagsRefDataService: CaseFlagsRefDataService,
  ) {
  }

  public resolve(route?: ActivatedRouteSnapshot): Observable<CaseFlagReferenceModel[]> {
    return this.caseFlagsRefDataService.getCaseFlagsRefData();
  }
}
