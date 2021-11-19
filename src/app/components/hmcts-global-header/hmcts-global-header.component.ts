import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { FlagDefinition, NavigationItem } from 'src/app/models/theming.model';
import * as fromNocStore from '../../../noc/store';
import { UserNavModel } from '../../models/user-nav.model';
import { UserService } from '../../services/user/user.service';

@Component({
    selector: 'exui-hmcts-global-header',
    templateUrl: './hmcts-global-header.component.html',
    styleUrls: ['./hmcts-global-header.component.scss']
})
export class HmctsGlobalHeaderComponent implements OnChanges {

  @Input() public set showNavItems(value: boolean) {
    this.showItems = value;
  }
  @Input() public items: NavigationItem[];
  @Input() public logoIsUsed: boolean;
  @Input() public showFindCase: boolean;
  @Input() public showCaseReferenceSearchBox: boolean;
  @Input() public headerTitle: {name: string; url: string};
  @Input() public navigation: UserNavModel;
  @Input() public logoType: string;
  @Input() public currentUrl: string;
  @Output() public navigate = new EventEmitter<string>();

  public showItems: boolean;
  public userValue = true;
  public tab;
  public get leftItems(): Observable<NavigationItem[]> {
    return this.menuItems.left.asObservable();
  };
  public get rightItems(): Observable<NavigationItem[]> {
    return this.menuItems.right.asObservable();
  };

  private menuItems = {
    left: new BehaviorSubject<NavigationItem[]>([]),
    right: new BehaviorSubject<NavigationItem[]>([])
  };

  constructor(
    public nocStore: Store<fromNocStore.State>,
    private readonly userService: UserService,
    private readonly featureToggleService: FeatureToggleService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.items.currentValue !== changes.items.previousValue) {
      this.splitAndFilterNavItems(this.items);
    }
  }

  public onEmitEvent(index: number): void {
    this.navigate.emit(this.navigation.items[index].emit);
  }

  public onEmitSubMenu(menuItem: any) {
    if (menuItem.href === '/noc') {
      this.nocStore.dispatch(new fromNocStore.Reset());
    }
  }

  private splitAndFilterNavItems(items: NavigationItem[]) {
    of(items).pipe(
      switchMap(unfilteredItems => this.filterNavItemsOnRole(unfilteredItems)),
      switchMap(roleFilteredItems => this.filterNavItemsOnFlag(roleFilteredItems)),
      map(filteredItems => this.splitNavItems(filteredItems))
    ).subscribe(sortedItems => {
      this.menuItems.left.next(sortedItems.left);
      this.menuItems.right.next(sortedItems.right);
    });
  }

  private splitNavItems(items: NavigationItem[]) {
    return {
      right: items.filter(item => item.align && item.align === 'right'),
      left: items.filter(item => !item.align || item.align !== 'right')
    };
  }

  private filterNavItemsOnRole(items: NavigationItem[]): Observable<NavigationItem[]> {
    return this.userService.getUserDetails().pipe(
      map(details => details.userInfo.roles),
      map(roles => {
        const i = items.filter(item => (item.roles && item.roles.length > 0 ? item.roles.some(role => roles.includes(role)) : true));
        return i.filter(item => (item.notRoles && item.notRoles.length > 0 ? item.roles.every(role => !roles.includes(role)) : true))
      })
    );
  }

  private filterNavItemsOnFlag(items: NavigationItem[]): Observable<NavigationItem[]> {
    const flags: {[flag: string]: boolean | string} = {};
    const obs: Observable<boolean>[] = [];
    items.forEach(
      item => (item.flags || []).concat(item.notFlags || []).forEach(
        flag => {
          let flagName = this.isPlainFlag(flag) ? flag : flag.flagName;
          obs.push(
            this.featureToggleService.isEnabled(flagName).pipe(
              tap(state => flags[flagName] = state)
            )
          );
        }
      )
    );

    if (obs.length === 0) {
      return of(items);
    }

    return ((obs.length > 1 ? obs[0].combineLatest(obs.slice(1)) : obs[0]) as Observable<any>).pipe(
      map(_ => {
        const i = items.filter(item => item.flags && item.flags.length > 0 ? item.flags.every(flag => this.isPlainFlag(flag) ? flags[flag] : flags[flag.flagName] === flag.value) : true);
        return i.filter(item => item.notFlags && item.notFlags.length > 0 ? item.flags.every(flag => this.isPlainFlag(flag) ? !flags[flag] : flags[flag.flagName] !== flag.value) : true);
      })
    );
  }

  private isPlainFlag(flag: FlagDefinition): flag is string {
    return !flag.hasOwnProperty('flagName');
  }
}
