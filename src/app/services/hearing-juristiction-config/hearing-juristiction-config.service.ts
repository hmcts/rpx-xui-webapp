import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EnvironmentService } from '../../shared/services/environment.service';
import { SessionStorageService } from '../session-storage/session-storage.service';

@Injectable({ providedIn: 'root' })
export class HearingJuristictionConfigService {
  constructor(private readonly environmentService: EnvironmentService,
              protected readonly sessionStorageService: SessionStorageService,
  ) {}

  public getConfig(): Observable<Array<any>> {
    return this.environmentService.config$.pipe(
      map((config) => config.hearingJuristictionConfig),
      switchMap((config) => this.filterConfigs(config))
    );
  }

  private filterConfigs(configs){
    const defaultKey = '.+';
    const userDetails = JSON.parse(this.sessionStorageService.getItem('userDetails'));
    const userId = userDetails?.id ? userDetails.id : userDetails.uid;
    const keys = Object.keys(configs);
    const otherConfigKeys = keys.filter((config) => config !== defaultKey);
    const selectedConfig = otherConfigKeys.find((config) => {
      const userIdRegex = new RegExp(config);
      return userIdRegex.test(userId);
    });
    return of(selectedConfig ? configs[selectedConfig] : configs[defaultKey]);
  }
}
