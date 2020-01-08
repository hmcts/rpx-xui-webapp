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
    this.timeout = 50; // set to 10 minutes

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
      // this.store.dispatch(new fromRoot.KeepAlive());
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
    /* setting userDetails idle time */
    const userIdleSession$ =  this.store.pipe(select(fromRoot.getUserIdleTimeOut))
      .pipe(filter(value => !isNaN(value)), take(1));
    userIdleSession$.subscribe((idle) => {
      if (idle) {
        const idleInSeconds = Math.floor((idle / 1000)) - this.timeout;
        console.log('idleInSeconds', idleInSeconds);
        this.idle.setIdle(idleInSeconds);
        this.idle.watch();
      }
    });
  }

}
