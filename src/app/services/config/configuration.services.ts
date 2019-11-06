import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CaseEditorConfig } from '@hmcts/ccd-case-ui-toolkit';
import { select, Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { catchError, take } from 'rxjs/operators';
import { ConfigurationModel, FeatureCollection, UrlCollection } from '../../models/configuration.model';
import * as fromApp from '../../store';

/**
 *  Configuration Services responsible for fetching initial config data needed for app to run
 *  It also provides instance of environment or other data
 */
@Injectable()
export class AppConfigService {

  constructor(private readonly http: HttpClient,  private readonly store: Store<fromApp.State>) {}
  private configuration: ConfigurationModel;
  /**
   * Loading configuration json file
   */
  public load(): Observable<ConfigurationModel> {
    const jsonFile = `assets/config/config.json`;
    return this.http.get<ConfigurationModel>(jsonFile).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * Getting configuration from the store
   * and setting it to private var
   */
  public setConfiguration() {
    this.store.pipe(select(fromApp.getAppFeatures), take(1)).subscribe(config => {
      this.configuration = config;
    });
  }
  /**
   * Returning features config
   */
  public getFeatureToggle(): FeatureCollection {
    return this.configuration.features;
  }
  /**
   * Returning caseEditorConfig config
   */
  public getEditorConfiguration(): CaseEditorConfig {
    return this.configuration.caseEditorConfig;
  }
  /**
   * Returning urls config
   */
  public getRoutesConfig(): { [id: string]: UrlCollection } {
    return this.configuration.urls;
  }

  // todo make it global and make it make sense
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


}
