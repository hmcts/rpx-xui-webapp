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
     const userRoles = this.cookieService.get('roles');
     this.isCaseManager = this.getIsCaseManager(userRoles);
     const observable = this.getObservable(this.store);
     this.subscription = this.subscribe(observable);
  }

  subscribe(observable: Observable<string>): Subscription {
    return  observable.subscribe(url => {
      this.showNavItems = of(AppUtils.showNavItems(url));
    });
  }

  getObservable(store: Store<fromRoot.State>): Observable<string> {
    return store.pipe(select(fromRoot.getRouterUrl));
  }

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
