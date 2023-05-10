import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { ConfigurationModel } from '../../models';
import * as fromApp from '../../store';
import { LoggerService } from '../logger/logger.service';

/**
 *  Configuration Services responsible for fetching initial config data needed for app to run
 *  It also provides instance of environment or other data
 */
@Injectable()
export class AppConfigService {
  constructor(
    private readonly http: HttpClient,
    private readonly store: Store<fromApp.State>,
    private readonly loggerService: LoggerService) {}

  private configuration: ConfigurationModel | any;

  /**
   * Loading configuration json file
   */
  public load(): Observable<any> {
    const jsonFile = 'assets/config/config.json';
    return this.http.get(jsonFile).pipe(
      catchError((error) => {
        this.loggerService.error('Error in AppConfigService:load', error);
        return throwError('There was a system error and your request could not be processed. Please try again.');
      })
    );
  }

  /**
   * Getting configuration from the store
   * and setting it to private var
   */
  public setConfiguration() {
    this.store.pipe(select(fromApp.getAppFeatures), take(1)).subscribe((config) => {
      this.configuration = config;
    });
  }

  /**
   * Returning features config
   */
  public getFeatureToggle() {
    return this.configuration.features;
  }

  /**
   * Returning caseEditorConfig config
   */
  public getEditorConfiguration() {
    return this.configuration.caseEditorConfig;
  }

  /**
   * Returning urls config
   */
  public getRoutesConfig() {
    return this.configuration.urls;
  }
}
