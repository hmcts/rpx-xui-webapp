import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie';
import { Observable, of, Subscription } from 'rxjs';
import { AppUtils } from 'src/app/app-utils';
import { AppTitleModel } from '../../models/app-title.model';
import { UserNavModel } from '../../models/user-nav.model';
import * as fromRoot from '../../store';

@Component({
  selector: 'exui-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() public navItems: { active: boolean; href: string; }[];
  @Input() public title: AppTitleModel;
  @Input() public userNav: UserNavModel;
  @Input() public showFindCase: boolean;
  @Output() public navigate = new EventEmitter<string>();

  public isCaseManager = false;
  public showNavItems: Observable<boolean>;
  public subscription: Subscription;

  constructor(
    public readonly store: Store<fromRoot.State>,
    private readonly cookieService: CookieService
  ) {}

  public ngOnInit() {
     const userRoles = this.cookieService.get('roles');
     this.isCaseManager = this.getIsCaseManager(userRoles);
     const observable = this.getObservable(this.store);
     this.subscription = this.subscribe(observable);
  }

  public subscribe(observable: Observable<string>): Subscription {
    return  observable.subscribe(url => {
      this.showNavItems = of(AppUtils.showNavItems(url));
    });
  }

  public getObservable(store: Store<fromRoot.State>): Observable<string> {
    return store.pipe(select(fromRoot.getRouterUrl));
  }

  public getIsCaseManager(userRoles: string): boolean {
    return userRoles && userRoles.indexOf('pui-case-manager') !== -1;
  }

  public ngOnDestroy() {
    this.unsubscribe(this.subscription);
  }

  public unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  public onNavigate(event) {
    this.emitNavigate(event, this.navigate);
  }

  public emitNavigate(event: any, emitter: EventEmitter<string>) {
    emitter.emit(event);
  }
}
