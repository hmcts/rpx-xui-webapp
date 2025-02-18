import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EnvironmentService } from '../../shared/services/environment.service';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { FeatureVariation } from 'src/cases/models/feature-variation.model';

@Injectable({ providedIn: 'root' })
export class HearingJurisdictionConfigService {
  constructor(private readonly environmentService: EnvironmentService,
              protected readonly sessionStorageService: SessionStorageService,
  ) {}

  public getHearingJurisdictionsConfig(): Observable<Array<FeatureVariation>> {
    return this.environmentService.config$.pipe(
      map((config) => config.hearingJurisdictionConfig.hearingJurisdictions),
      switchMap((config) => this.filterConfigs(config))
    );
  }

  public getHearingAmendmentConfig(): Observable<Array<FeatureVariation>> {
    return this.environmentService.config$.pipe(
      map((config) => config.hearingJurisdictionConfig.hearingAmendment),
      switchMap((config) => this.filterConfigs(config))
    );
  }

  private filterConfigs(configs): Observable<Array<FeatureVariation>>{
    const userDetails = JSON.parse(this.sessionStorageService.getItem('userDetails'));
    const userId = userDetails?.id ? userDetails.id : userDetails.uid;
    const configKeys = Object.keys(configs);
    const selectedConfig = configKeys.find((config) => {
      const userIdRegex = new RegExp(config);
      return userIdRegex.test(userId);
    });
    return of(configs[selectedConfig]);
  }
}
