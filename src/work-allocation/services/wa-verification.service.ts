import { WASupportedJurisdictionsService } from './wa-supported-jurisdiction.service';
import { WAVerificationModel } from '../../app/models';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { AppConfig } from '../../app/services/ccd-config/ccd-case.config';

@Injectable({ providedIn: 'root' })
export class WAVerificationService {
  constructor(
    private readonly waSupportedJurisdictionsService: WASupportedJurisdictionsService,
    private readonly appConfig: AppConfig
  ) {}

  public getWAVerification(): Observable<WAVerificationModel> {
    const waSupportedCategories = this.appConfig.getWASupportedRoleCategories();
    const waSupportedRoleTypes = this.appConfig.getWASupportedRoleTypes();

    return this.safeArray(this.waSupportedJurisdictionsService.getWASupportedJurisdictions()).pipe(
      map((waSupportedJurisdictions) => ({
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
