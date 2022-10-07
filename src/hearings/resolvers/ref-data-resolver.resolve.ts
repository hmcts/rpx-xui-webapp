import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { SessionStorageService } from '../../app/services';
import { HearingCategory } from '../models/hearings.enum';
import { LovRefDataModel } from '../models/lovRefData.model';
import { LovRefDataService } from '../services/lov-ref-data.service';
import * as fromHearingStore from '../store';
import {ServiceIdResolverResolve} from './service-id-resolver.resolve';

@Injectable({
  providedIn: 'root'
})
export class RefDataResolver extends ServiceIdResolverResolve implements Resolve<LovRefDataModel[]> {
  public serviceId: string = '';

  constructor(
    protected readonly lovRefDataService: LovRefDataService,
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly router: Router,
    protected readonly sessionStorageService: SessionStorageService
  ) {
    super(hearingStore);
  }

  public resolve(route?: ActivatedRouteSnapshot): Observable<LovRefDataModel[]> {
    return this.getServiceId$()
      .pipe(
        switchMap(id => {
          return of(
            id ? id : this.serviceId);
        }), take(1),
        switchMap((serviceId) => {
          const category = route.data['category'] ? route.data['category'] as HearingCategory : HearingCategory.HearingPriority;
          return this.getReferenceData$(serviceId, category, route.data.isChildRequired && route.data.isChildRequired.includes(route.data['category']));
        })
      );
  }

  public getReferenceData$(serviceId, category: HearingCategory, isChildRequired): Observable<LovRefDataModel[]> {
    const sessionKey = this.getLovSessionKey(serviceId, category);
    const lovDataFromSession = this.getLovRefDataFromSession(sessionKey);
    if (lovDataFromSession && lovDataFromSession.length > 0) {
      return of(lovDataFromSession);
    }
    return this.lovRefDataService.getListOfValues(category, serviceId, isChildRequired).pipe(
      tap((lovData) => {
        // by pass EntityRoleCode/HearingChannel and not put them in session storage as it causes inconsistency between request/actual hearing
        if (category !== HearingCategory.EntityRoleCode && category !== HearingCategory.HearingChannel) {
          this.sessionStorageService.setItem(sessionKey, JSON.stringify(lovData));
        }
      }),
      catchError(() => {
        this.router.navigate(['/hearings/error']);
        return of(null);
      })
    );
  }

  public getLovRefDataFromSession(sessionKey): LovRefDataModel[] {
    const lovDataStr = this.sessionStorageService.getItem(sessionKey);
    if (lovDataStr) {
      const lovData = JSON.parse(lovDataStr);
      return lovData as LovRefDataModel[];
    }
    return [];
  }

  public getLovSessionKey(serviceId: string, category: string): string {
    return `lov-${serviceId}-${category}`;
  }
}
