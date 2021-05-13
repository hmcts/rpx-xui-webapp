import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

export const ENVIRONMENT = {
  orgUri: '/api/organisation'
};

@Injectable()
export class OrganisationService {
  constructor(private http: HttpClient) { }

  public fetchOrganisation(): Observable<any> {
   return this.http.get<any>(`${ENVIRONMENT.orgUri}`);
  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was:`, error.error);
    }
    // return an observable with a user-facing error message
    return throwError(
      'error please try again later.');
  }
}
