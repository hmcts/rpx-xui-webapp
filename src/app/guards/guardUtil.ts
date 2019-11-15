import { CookieService } from 'ngx-cookie';
import * as fromApp from '../store';
import { Store, select } from '@ngrx/store';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import { TermsAndCondition } from 'src/app/models/TermsAndCondition';
import { Inject, Injectable } from '@angular/core';

@Injectable()

export class GuardUtil {
   constructor(private cookieService: CookieService) {}

    checkStore(store: Store<fromApp.State>, url: string, hasUserAcceptedTC: string, userIdCookie: string = '__userid__') {
        return store.pipe(select(fromApp.getTandCLoaded),
          tap(tcConfirmed => {
            this.handleTC(tcConfirmed, userIdCookie, url, this.cookieService, store, hasUserAcceptedTC);
          }),
          filter(tcConfirmed => tcConfirmed.isLoaded),
          take(1)
        );
      }

      handleTC(tcConfirmed: TermsAndCondition,
               userIdCookieName: string,
               acceptTcPath: string,
               cookieService: CookieService,
               store: Store<fromApp.State>,
               hasUserAcceptedTC: string) {
        if (!tcConfirmed.isLoaded) {
          const userId = cookieService.get(userIdCookieName);
          store.dispatch(new fromApp.LoadHasAcceptedTC(userId));
        }
        if (tcConfirmed.hasUserAcceptedTC === hasUserAcceptedTC) {
          store.dispatch(new fromApp.Go({path: [acceptTcPath]}));
        }
      }
}
