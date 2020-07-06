import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { GoogleAnalyticsService, ManageSessionServices, TimeoutNotificationsService } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import {propsExist} from '../../../../api/lib/objectUtilities';
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
    countdown: 100,
    isVisible: false,
  }

  constructor(
    private readonly store: Store<fromRoot.State>,
    private googleAnalyticsService: GoogleAnalyticsService,
    private readonly idleService: ManageSessionServices,
    private readonly timeoutNotificationsService: TimeoutNotificationsService
  ) {

    this.googleAnalyticsService.init(config.googleAnalyticsKey);
  }

  public ngOnInit() {

    this.store.pipe(select(fromRoot.getUseIdleSessionTimeout)).subscribe(useIdleTimeout => {
      if (useIdleTimeout) {
        this.loadAndListenForUserDetails();
      }
    });
  }

  /**
   * Load and Listen for User Details
   */
  public loadAndListenForUserDetails() {

    this.store.pipe(select(fromRoot.getUserDetails)).subscribe(userDetails => this.userDetailsHandler(userDetails))

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

      console.log(userDetails.sessionTimeout);
      const { idleModalDisplayTime, totalIdleTime } = userDetails.sessionTimeout;

      this.addTimeoutNotificationServiceListener();
      this.initTimeoutService(idleModalDisplayTime, totalIdleTime);
    }
  }

  /**
   * Add Timeout Notification Service Listener
   *
   * TODO: Change eventEmitterChanges()
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
   * The 'countdown' event which dispatches a readable countdown timer in it's event payload, the countdown
   * timer is a readable version of the countdown time ie. '10 seconds' or '1 minute'. Note that this dispatches
   * once per second when the timer has reached less than 60 seconds till the 'sign-out' event is fired.
   *
   * If it's above a minute this event is dispatched every minute.
   *
   * The 'keep-alive' event dispatches when the User has interacted with the page again.
   *
   * The 'sign-out' event which dispatches when the countdown timer has come to an end - when the User
   * should be signed out.
   *
   * @param event - {
   *  eventType: 'countdown'
   *  readableCountdown: '42 seconds',
   * }
   */
  public timeoutNotificationEventHandler(event) {

    console.log('event.eventType');
    console.log(event);
    switch (event.eventType) {
      case 'countdown': {
        this.updateTimeoutModal(event.readableCountdown, true);
        return;
      }
      case 'sign-out': {
        this.updateTimeoutModal(undefined, false);

        this.store.dispatch(new fromRoot.StopIdleSessionTimeout());
        this.store.dispatch(new fromRoot.IdleUserLogOut());
        return;
      }
      case 'keep-alive': {
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
  public updateTimeoutModal(countdown: number, isVisible: boolean): void {
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

  // TODO: Keep consistent naming conventions
  public signOutHandler() {

    this.store.dispatch(new fromRoot.StopIdleSessionTimeout());
    this.store.dispatch(new fromRoot.Logout());
  }

  /**
   * Initialise Idle Service
   *
   * We initialise the Idle Service which is part of the common lib.
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
   * TODO: Clean up the common lib session timeout component.
   * Note that `timeout` as specified by the common lib, uses seconds as its unit of time. Whereas `idleMilliseconds`
   * uses milliseconds. This needs to be changed in the common-lib to use minutes as discussed with the BA. But
   * for now we will do the conversion from minutes used up to this point to units required by the common-lib.
   *
   * TODO: keepAliveInSeconds is not required, awaiting Open Id Connect implementation before it's removal
   *
   * @param idleModalDisplayTime - Should reach here in minutes
   * @param totalIdleTime - Should reach here in minutes
   */
  public initTimeoutService(idleModalDisplayTime, totalIdleTime) {

    const idleModalDisplayTimeInSeconds = idleModalDisplayTime * 60;
    const idleModalDisplayTimeInMilliseconds = idleModalDisplayTimeInSeconds * 1000;

    const totalIdleTimeInMilliseconds = (totalIdleTime * 60) * 1000;

    // Api should always take milliseconds
    const newIdleConfig: any = {
      idleModalDisplayTime: idleModalDisplayTimeInMilliseconds,
      totalIdleTime: totalIdleTimeInMilliseconds,
      idleServiceName: 'idleSession'
    };

    // this.idleService.init(idleConfig);
    this.timeoutNotificationsService.initialise(newIdleConfig);
  }
}
