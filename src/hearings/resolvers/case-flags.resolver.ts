import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, take} from 'rxjs/operators';
import {CaseFlagReferenceModel} from '../models/caseFlagReference.model';
import {CaseFlagsRefDataService} from '../services/case-flags-ref-data.service';
import * as fromHearingStore from '../store';
import {ServiceIdResolverResolve} from './service-id-resolver.resolve';

@Injectable({
  providedIn: 'root'
})
export class CaseFlagsResolver extends ServiceIdResolverResolve implements Resolve<CaseFlagReferenceModel[]> {

  constructor(
    private readonly caseFlagsRefDataService: CaseFlagsRefDataService,
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly router: Router
  ) {
    super(hearingStore);
  }

  public resolve(route?: ActivatedRouteSnapshot): Observable<CaseFlagReferenceModel[]> {
    return this.getServiceId$()
      .pipe(
        switchMap(id => {
          return of(
            id ? id : this.serviceId);
        }), take(1),
        switchMap((serviceId) => {
          return this.caseFlagsRefDataService.getCaseFlagsRefData(serviceId).pipe(
            map(data => data.flags[0].FlagDetails),
            catchError(() => {
              return this.router.navigate(['/hearings/error']);
            })
          );
        })
      );
  }
}
