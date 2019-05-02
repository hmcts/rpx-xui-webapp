import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as fromApp from '../store';
import {Store, select} from '@ngrx/store';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ConfigurationModel} from '../models/configuration.model';
import {catchError, take} from 'rxjs/operators';
import {throwError} from 'rxjs';


/**
 *  Configuration Services responsible for fetching initial cofig data needed for app  to run
 *  It also provides instance of environment or other data;
 */
@Injectable()
export class AppConfigService {

  constructor(private http: HttpClient,  private store: Store<fromApp.State>) {}
  private configuration: ConfigurationModel;

  load(): Observable<any> {
    const jsonFile = `assets/config/config.json`;
    return this.http.get(jsonFile).pipe(
      catchError(this.handleError)
    );
  }

  setConfiguration() {
    this.store.pipe(select(fromApp.getAppFeatures), take(1)).subscribe(config => {
      this.configuration = config;
    });
  }
  getFeatureToggle() {
    return this.configuration.features;
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
  };


}
