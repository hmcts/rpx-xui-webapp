import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { GoogleAnalyticsService, ManageSessionServices } from '@hmcts/rpx-xui-common-lib';
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

  public modalConfig = {
    countdown: 100,
    isVisible: false,
  }

  constructor(
    private readonly store: Store<fromRoot.State>,
    private googleAnalyticsService: GoogleAnalyticsService,
    private readonly idleService: ManageSessionServices
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
   * If the sessionTimeout exists on the userDetails object we add the Idle Service Listeners, and initialise
   * the Idle service.
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

      this.addIdleServiceListener();
      this.initIdleService(idleModalDisplayTime, totalIdleTime);
    }
  }

  /**
   * Add Idle Service Listener
   *
   * We listen for idle service events, that alert the application to the User being Idle.
   */
  public addIdleServiceListener() {

    this.idleService.appStateChanges().subscribe(event => {
      this.idleServiceEventHandler(event);
    });
  }

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

    switch (value.type) {
      case IDLE_EVENT_MODAL: {
        this.setModal(value.countdown, value.isVisible);
        return;
      }
      case IDLE_EVENT_SIGNOUT: {
        this.setModal(undefined, false);

        this.store.dispatch(new fromRoot.StopIdleSessionTimeout());
        this.store.dispatch(new fromRoot.IdleUserLogOut());
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

  /**
   * Set Modal
   *
   * Set the modal countdown, and if the modal is visible to the User.
   */
  public setModal(countdown: number, isVisible: boolean): void {
    this.modalConfig = {
        countdown,
        isVisible
    };
  }

  /**
   * Stay Signed in Handler
   */
  public staySignedInHandler() {
    this.setModal(undefined, false);
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
  public initIdleService(idleModalDisplayTime, totalIdleTime) {

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
