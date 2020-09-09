import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '../../store';
import {AppTitleModel} from '../../models/app-title.model';
import {UserNavModel} from '../../models/user-nav.model';
import { CookieService } from 'ngx-cookie';
import { Observable, of, Subscription } from 'rxjs';
import { AppUtils } from 'src/app/app-utils';

@Component({
  selector: 'exui-header',
  templateUrl: './header.component.html'
})

/**
 * Header Component
 *
 * This header component is common to both MO and MC, and is doing the work of fetching data from the store,
 * and displaying the items in the header dependent on the User.
 *
 * TODO:
 * If we want to keep our /component folder pure and gradually move these components across to a common lib,
 * we should not have application logic in here ie. this.cookieService.get('roles'), and none of the logic that
 * fetches items from the store, instead they should be passed down into this component.
 *
 * Therefore application logic needs to be abstracted up a level, to app-header.
 */
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() navItems: { active: boolean; href: string; }[];
  @Input() title: AppTitleModel;
  @Input() userNav: UserNavModel;
  @Input() showFindCase: boolean;
  @Output() navigate = new EventEmitter<string>();

  public isCaseManager = false;
  showNavItems: Observable<boolean>;
  subscription: Subscription;

  constructor(
    public store: Store<fromRoot.State>,
    private cookieService: CookieService
  ) {}


  ngOnInit() {
     // This is in the wrong location? This should be in app-header.component.ts,
     // and we should use it to pull out the correct Judicial role, and send
     // the configuration of the header into this header component.
     const userRoles = this.cookieService.get('roles');
     this.isCaseManager = this.getIsCaseManager(userRoles);
     const observable = this.getObservable(this.store);
     this.subscription = this.subscribe(observable);
  }

  // So over here we're subscribing to the nav items
  subscribe(observable: Observable<string>): Subscription {
    return  observable.subscribe(url => {
      this.showNavItems = of(AppUtils.showNavItems(url));
    });
  }

  getObservable(store: Store<fromRoot.State>): Observable<string> {
    return store.pipe(select(fromRoot.getRouterUrl));
  }

  // we're doing a simple way of checking what role the User has
  // the header component is checking.
  getIsCaseManager(userRoles: string): boolean {
    return userRoles && userRoles.indexOf('pui-case-manager') !== -1;
  }

  ngOnDestroy() {
    this.unsubscribe(this.subscription);
  }

  unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  onNavigate(event) {
    this.emitNavigate(event, this.navigate);
  }

  emitNavigate(event: any, emitter: EventEmitter<string>) {
    emitter.emit(event);
  }
}
