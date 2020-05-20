import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { GoogleAnalyticsService, ManageSessionServices } from '@hmcts/rpx-xui-common-lib';
import { environment as config } from '../../../environments/environment';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../store';
import {propsExist} from '../../../../api/lib/objectUtilities';

@Component({
  selector: 'exui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(
    private readonly store: Store<fromRoot.State>,
    private googleAnalyticsService: GoogleAnalyticsService,
    private readonly idleService: ManageSessionServices
  ) {

    this.googleAnalyticsService.init(config.googleAnalyticsKey);

    console.log('hello app');
  }

  public ngOnInit() {

    this.store.pipe(select(fromRoot.getUserDetails)).subscribe(userDetails => {
      if (propsExist(userDetails,['sessionTimeout']) && userDetails.sessionTimeout.totalIdleTime > 0) {
        console.log('hello User details in app');
        console.log(userDetails);

        const { idleModalDisplayTime, totalIdleTime } = userDetails.sessionTimeout;

        this.addIdleServiceListener();
        this.initIdleService(idleModalDisplayTime, totalIdleTime);
      }
    });

    // We send an action to get the User's details
    this.store.dispatch(new fromRoot.LoadUserDetails());
  }
  /**
   * Add Idle Service Listener
   *
   * We listen for idle service events, that alert the application to the User being Idle.
   */
  public addIdleServiceListener() {

    console.log('ADD IDLE SERVICE LISTENER');
    this.idleService.appStateChanges().subscribe(event => {
      this.idleServiceEventHandler(event);
    });
  }

  /**
   * Add User Profile Listener
   *
   * We listen for User Profile details. Once the application has these details we are able to initialise the idle timer,
   * which displays a Session Timeout Modal to the User if they have been idle for x amount of time.
   *
   * The User profile details contain the User's session timeout information.
   *
   * The User's Session Timeout information is different per User and per application.
   *
   * TODO: Remove console.log(userProfile) after testing
   */
  // public addUserProfileListener() {
  //
  //   this.store.pipe(select(fromUserProfile.getUser)).subscribe(userProfile => {
  //     if (userProfile) {
  //       console.log(userProfile);
  //       const { idleModalDisplayTime, totalIdleTime } = userProfile.sessionTimeout;
  //
  //       this.initIdleService(idleModalDisplayTime, totalIdleTime);
  //     }
  //   });
  // }

  /**
   * Idle Service Event Handler
   *
   * TODO:
   * It shouldn't really be the common libs responsibility to tell the application whether to show and hide the modal,
   * the application should show and hide the modal. The common lib, should only throw the Idle events.
   *
   * @param value - { 'isVisible': false, 'countdown': ''}
   */
  public idleServiceEventHandler(value) {

    const IDLE_EVENT_MODAL = 'modal';
    const IDLE_EVENT_SIGNOUT = 'signout';
    const IDLE_EVENT_KEEP_ALIVE = 'keepalive';

    // TODO: You are receiving 4 events here, why?
    switch (value.type) {
      case IDLE_EVENT_MODAL: {
        console.log('idle event modal');
        console.log(value);
        // this.dispatchModal(value.countdown, value.isVisible);
        return;
      }
      case IDLE_EVENT_SIGNOUT: {
        console.log('idle event signout');
        console.log(value);
        // this.dispatchModal(undefined, false);
        // this.store.dispatch(new fromRoot.IdleUserSignOut());
        return;
      }
      case IDLE_EVENT_KEEP_ALIVE: {
        return;
      }
      default: {
        throw new Error('Invalid Dispatch session');
      }
    }
  }

  // public dispatchModal(countdown = '0', isVisible): void {
  //   const modalConfig: any = {
  //     session: {
  //       countdown,
  //       isVisible
  //     }
  //   };
  //   this.store.dispatch(new fromRoot.SetModal(modalConfig));
  // }

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
  public initIdleService(idleModalDisplayTime, totalIdleTime) {

    console.log(idleModalDisplayTime);
    console.log(totalIdleTime);

    const idleModalDisplayTimeInSeconds = idleModalDisplayTime * 60;
    const totalIdleTimeInMilliseconds = (totalIdleTime * 60) * 1000;

    const idleConfig: any = {
      timeout: idleModalDisplayTimeInSeconds,
      idleMilliseconds: totalIdleTimeInMilliseconds,
      idleServiceName: 'idleSession',
      keepAliveInSeconds: 5 * 60 * 60,
    };

    this.idleService.init(idleConfig);
  }
}
