import { Injectable } from '@angular/core';
import {Idle, DocumentInterruptSource } from '@ng-idle/core';
import {select, Store} from '@ngrx/store';
import * as fromRoot from '../../store';
import {
  delay,
  distinctUntilChanged,
  map,
  take
} from 'rxjs/operators';
import {Keepalive} from '@ng-idle/keepalive';
import {combineLatest} from 'rxjs';
import {IdleConfigModel} from '../../models/idle-config.model';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private store: Store<fromRoot.State>
  ) {}

  public init(idleConfig: IdleConfigModel): void {
    this.idle.setIdleName(idleConfig.idleServiceName);
    this.idle.setTimeout(idleConfig.timeout);

    const interrupt =
      new DocumentInterruptSource('mousedown keydown DOMMouseScroll mousewheel touchstart touchmove scroll');
    this.idle.setInterrupts([interrupt]);

    // adding delay so that user can click on sign out before the modal shuts
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
      distinctUntilChanged()
    ).subscribe((countdown) => {
      this.dispatchModal(countdown, true);
    });

    this.keepalive.interval(idleConfig.keepAliveInSeconds);
    this.keepalive.onPing.pipe(delay(250)).subscribe(() => {
      console.log('Keep alive');
      this.store.dispatch(new fromRoot.KeepAlive());
    });

    const idleInSeconds = Math.floor((idleConfig.idleMilliseconds / 1000)) - idleConfig.timeout;
    console.log('idleInSeconds', idleInSeconds)
    this.idle.setIdle(idleInSeconds);
    this.idle.watch();
  }

  public dispatchModal(countdown = '0', isVisible): void {
    const modalConfig: any = {
      session: {
        countdown,
        isVisible
      }
    };
    this.store.dispatch(new fromRoot.SetModal(modalConfig));
  }

  public dispatchSignedOut(): void {
    this.dispatchModal(undefined, false);
    this.store.dispatch(new fromRoot.SignedOut()); // sing out BE
  }

}
