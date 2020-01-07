import { Injectable } from '@angular/core';

import {Idle, DocumentInterruptSource } from '@ng-idle/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../store';
// import * as fromUserProfile from '../../userDetails-profile/store';
import {
  delay,
  distinctUntilChanged,
  filter, finalize,
  first,
  map,
  take,
  takeWhile,
  tap
} from 'rxjs/operators';
import {Keepalive} from '@ng-idle/keepalive';
import {combineLatest, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class IdleService {
  timeout: number;
  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private store: Store<fromRoot.State>
  ) {}

  public init(): void {
    // time is set in seconds
    this.timeout = 60; // set to 10 minutes

    this.idle.setIdleName('idleSession');
    this.idle.setTimeout(this.timeout);

    const interrupt =
      new DocumentInterruptSource('mousedown keydown DOMMouseScroll mousewheel touchstart touchmove scroll');
    this.idle.setInterrupts([interrupt]);

    // adding delay so that userDetails can click on sign out before the windows closes
    this.idle.onIdleEnd.pipe(delay(250)).subscribe(() => {
      console.log('No longer idle.');
      this.dispatchModal(undefined, false);
    });

    this.idle.onTimeout.subscribe(() => {
      console.log('Timed out!');
      this.dispatchSignedOut();
      this.dispatchModal(undefined, false);
    });

    this.idle.onIdleStart.subscribe(() => {
      console.log('You\'ve gone idle!');
    });

    this.idle.onTimeoutWarning.pipe(
      map(sec => (sec > 60) ? Math.ceil(sec / 60) + ' minutes' : sec + ' seconds'),
      tap(console.log), // remove when happy
      distinctUntilChanged()
    ).subscribe((countdown) => {
      this.dispatchModal(countdown, true);
    });

    // sets the ping interval to 600 seconds - check the backend needs.
    this.keepalive.interval(30);
    this.keepalive.onPing.pipe(delay(250)).subscribe(() => {
      console.log('Keep alive');
      this.store.dispatch(new fromRoot.KeepAlive());
    });

    this.initWatch();
  }

  dispatchModal(countdown = 0, isVisible): void {
    const modalConfig: any = {
      session: {
        countdown,
        isVisible
      }
    };
    this.store.dispatch(new fromRoot.SetModal(modalConfig));
  }

  keepAlive() {
    const thirtyMinutes = 20 * 1000;
    const thirtyMinInterval$ = timer(thirtyMinutes, thirtyMinutes);
    thirtyMinInterval$.subscribe(() => {
      console.log('Keep alive');
      this.store.dispatch(new fromRoot.KeepAlive());
    });
  }

  dispatchSignedOut() {
    this.dispatchModal(undefined, false);
    this.store.dispatch(new fromRoot.SignedOut()); // sing out BE
  }

  initWatch(): void {
    // /* limiting session to up to max server session 8 hrs */
    // this.store.pipe(select(fromUserProfile.getSessionTimeOut))
    //   .pipe(filter(value => !isNaN(value)), take(1))
    //   .subscribe(value => {
    //     const now = Math.round(new Date().getTime());
    //     const timeDifference = Math.round(value - now);
    //     const timeOut$ = timer(timeDifference, 1000).pipe(
    //       takeWhile(val => val <= 60),
    //       finalize(() => {
    //         this.dispatchSignedOut();
    //         this.dispatchModal(undefined, false);
    //       })
    //     );
    //     timeOut$.subscribe(time => {
    //       this.dispatchModal(time, true);
    //     });
    //   });

    // /* setting userDetails idle time */
    // const route$ = this.store.pipe(select(fromRoot.getRouterUrl));
    // // const userIdleSession$ =  this.store.pipe(select(fromUserProfile.getUserTimeOut));
    // combineLatest(
    //   route$.pipe(first(value => typeof value === 'string' )),
    //   userIdleSession$.pipe(filter(value => !isNaN(value)), take(1))
    // ).subscribe(([routes, idle]) => {
    //   const isRegisterOrg: boolean = routes.indexOf('register-org') !== -1;
    //   const isSignedOut: boolean = routes.indexOf('signed-out') !== -1;
    //   if (routes && !(isRegisterOrg || isSignedOut) && idle) {
    //     const idleInSeconds = Math.floor((idle / 1000)) - this.timeout;
    //     console.log('idleInSeconds', idleInSeconds);
    //     this.idle.setIdle(idleInSeconds);
    //     this.idle.watch();
    //   }
    // });
  }

}
