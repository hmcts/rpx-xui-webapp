import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RoutesRecognized } from '@angular/router';
import { GoogleTagManagerService, TimeoutNotificationsService } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';

import { propsExist } from '../../../../api/lib/objectUtilities';
import { environment as config } from '../../../environments/environment';
import * as fromRoot from '../../store';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {

  public timeoutModalConfig = {
    countdown: '0 seconds',
    isVisible: false,
  };

  constructor(
    private readonly store: Store<fromRoot.State>,
    private readonly googleTagManagerService: GoogleTagManagerService,
    private readonly timeoutNotificationsService: TimeoutNotificationsService,
    private readonly router: Router,
    private readonly titleService: Title
  ) {

    this.googleTagManagerService.init(config.googleTagManagerKey);

    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        let child = data.state.root;
        do {
          child = child.firstChild;
        } while (child.firstChild);
        const d = child.data;
        if (d.title) {
          this.titleService.setTitle(`${d.title} - HM Courts & Tribunals Service - GOV.UK`);
        }
      }
    });
  }

  public ngOnInit() {
    this.store.pipe(select(fromRoot.getUseIdleSessionTimeout)).subscribe(useIdleTimeout => {
      if (useIdleTimeout) {
        this.loadAndListenForUserDetails();
      }
    });

    // Moved here from CaseHomeComponent as this needs to be app-wide, and
    // not just happening for the Case view. Moreover, it has an impact on
    // the rendering of the menu as it triggers an action that gets hold of
    // the user's profile.
    this.store.dispatch(new fromRoot.StartIdleSessionTimeout());
  }

  /**
   * Load and Listen for User Details
   */
  public loadAndListenForUserDetails() {

    this.store.pipe(select(fromRoot.getUserDetails)).subscribe(userDetails => this.userDetailsHandler(userDetails));

    this.store.dispatch(new fromRoot.LoadUserDetails());
  }

  /**
   * User Details Handler
   *
   * If the sessionTimeout exists on the userDetails object we add the Timeout Notification Service Listeners,
   * and initialise the Timeout Notification Service.
   *
   * @param userDetails - {
   *  "sessionTimeout": {
   *  "idleModalDisplayTime": 10,
   *  "pattern": "-solicitor",
   *  "totalIdleTime": 50
   *  }
   * }
   */
  public userDetailsHandler(userDetails) {

    if (propsExist(userDetails, ['sessionTimeout'] ) && userDetails.sessionTimeout.totalIdleTime > 0) {
      const { idleModalDisplayTime, totalIdleTime } = userDetails.sessionTimeout;

      this.addTimeoutNotificationServiceListener();
      this.initTimeoutNotificationService(idleModalDisplayTime, totalIdleTime);
    }
  }

  /**
   * Add Timeout Notification Service Listener
   *
   * We listen for Timeout Notification Service events.
   */
  public addTimeoutNotificationServiceListener() {

    this.timeoutNotificationsService.notificationOnChange().subscribe(event => {
      this.timeoutNotificationEventHandler(event);
    });
  }

  /**
   * Timeout Notification Event Handler
   *
   * The Timeout Notification Service currently has three events that we can handle. These are:
   *
   * The 'countdown' event. This event dispatches a readable countdown timer in it's event payload. the countdown
   * timer is a readable version of the countdown time ie. '10 seconds' or '1 minute'. Note that this dispatches
   * once per second when the timer has reached less than 60 seconds till the 'sign-out' event is fired.
   *
   * If the 'countdown' timer is above a minute this event is dispatched every minute.
   *
   * The 'keep-alive' event dispatches when the User has interacted with the page again.
   *
   * The 'sign-out' event dispatches when the countdown timer has come to an end - when the User
   * should be signed out.
   *
   * @param event - {
   *  eventType: 'countdown'
   *  readableCountdown: '42 seconds',
   * }
   */
  public timeoutNotificationEventHandler(event) {

    switch (event.eventType) {
      case 'countdown': {
        this.updateTimeoutModal(event.readableCountdown, true);
        return;
      }
      case 'sign-out': {
        this.updateTimeoutModal('0 seconds', false);

        console.log('sign-out');
        this.store.dispatch(new fromRoot.StopIdleSessionTimeout());
        this.store.dispatch(new fromRoot.IdleUserLogOut());
        return;
      }
      case 'keep-alive': {
        this.updateTimeoutModal('0 seconds', false);
        return;
      }
      default: {
        throw new Error('Invalid Timeout Notification Event');
      }
    }
  }

  /**
   * Set Modal
   *
   * Set the modal countdown, and if the modal is visible to the User.
   */
  public updateTimeoutModal(countdown: string, isVisible: boolean): void {
    this.timeoutModalConfig = {
        countdown,
        isVisible
    };
  }

  /**
   * Stay Signed in Handler
   */
  public staySignedInHandler() {

    this.updateTimeoutModal(undefined, false);
  }

  public signOutHandler() {

    this.store.dispatch(new fromRoot.StopIdleSessionTimeout());
    this.store.dispatch(new fromRoot.Logout());
  }

  /**
   * Initialise Timeout Notficiation Service
   *
   * We initialise the Idle Notification Service which is part of the common lib.
   *
   * Why do we use minutes up to this point over seconds, or milliseconds?
   *
   * i. Easy to see in the configuration how many minutes each User group's modal
   * and session timeout lasts.
   * ii. Less zero's mean less human mistakes.
   * iii. Discussed with BA minutes makes sense.
   *
   * <code>totalIdleTime</code> is the total amount of time in minutes that the User is idle for.
   * The Users total idle time, includes the time in which we show the Session Timeout Modal to the User
   *
   * <code>idleModalDisplayTime</code> is the total amount of time in minutes to display the Session Timeout Modal.
   *
   * Important note: The idleModalDisplayTime IS PART of the totalIdleTime. The idleModalDisplayTime does not get added to the end of
   * the totalIdleTime.
   *
   * We convert idleModalDisplayTime and totalIdleTime which reaches here in minutes to seconds.
   *
   * @param idleModalDisplayTime - Should reach here in minutes
   * @param totalIdleTime - Should reach here in minutes
   */
  public initTimeoutNotificationService(idleModalDisplayTime, totalIdleTime) {

    const idleModalDisplayTimeInSeconds = idleModalDisplayTime * 60;
    const idleModalDisplayTimeInMilliseconds = idleModalDisplayTimeInSeconds * 1000;

    const totalIdleTimeInMilliseconds = (totalIdleTime * 60) * 1000;

    const timeoutNotificationConfig: any = {
      idleModalDisplayTime: idleModalDisplayTimeInMilliseconds,
      totalIdleTime: totalIdleTimeInMilliseconds,
      idleServiceName: 'idleSession'
    };

    this.timeoutNotificationsService.initialise(timeoutNotificationConfig);
  }
}
