import { WASupportedRoleDetailsService } from './wa-supported-role-details.service';
import { WASupportedJurisdictionsService } from './wa-supported-jurisdiction.service';
import { WAVerificationModel } from '../../app/models';
import { combineLatest, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WAVerificationService {
  constructor(
    private readonly waSupportedRoleDetailsService: WASupportedRoleDetailsService,
    private readonly waSupportedJurisdictionsService: WASupportedJurisdictionsService
  ) {}

  public getWAVerification(): Observable<WAVerificationModel> {
    return combineLatest([
      this.safeArray(this.waSupportedRoleDetailsService.getWASupportedRoleCategories()),
      this.safeArray(this.waSupportedRoleDetailsService.getWASupportedRoleTypes()),
      this.safeArray(this.waSupportedJurisdictionsService.getWASupportedJurisdictions()),
    ]).pipe(
      map(([waSupportedCategories, waSupportedRoleTypes, waSupportedJurisdictions]) => ({
        waSupportedCategories,
        waSupportedRoleTypes,
        waSupportedJurisdictions,
      }))
    );
  }

  private safeArray(source$: Observable<string[]>): Observable<string[]> {
    return source$.pipe(catchError(() => of([])));
  }
}
