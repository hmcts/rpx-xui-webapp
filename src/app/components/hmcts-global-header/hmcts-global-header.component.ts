import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as fromAppStore from '../../../app/store';
import * as fromNocStore from '../../../noc/store';
import { NavItemsModel } from '../../models/nav-item.model';
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
  @Input() public items: NavItemsModel[];
  @Input() public logoIsUsed: boolean;
  @Input() public showFindCase: boolean;
  @Input() public showCaseReferenceSearchBox: boolean;
  @Input() public headerTitle: {name: string; url: string};
  @Input() public navigation: UserNavModel;
  @Input() public logoType: string;
  @Input() public currentUrl: string;
  @Input() public decorate16DigitCaseReferenceSearchBoxInHeader: boolean;
  @Output() public navigate = new EventEmitter<string>();

  public showItems: boolean;
  public userValue = true;
  public tab;
  public get leftItems(): Observable<NavItemsModel[]> {
    return this.menuItems.left.asObservable();
  }
  public get rightItems(): Observable<NavItemsModel[]> {
    return this.menuItems.right.asObservable();
  }

  private readonly menuItems = {
    left: new BehaviorSubject<NavItemsModel[]>([]),
    right: new BehaviorSubject<NavItemsModel[]>([])
  };

  constructor(
    private readonly appStore: Store<fromAppStore.State>,
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

  public onEmitSubMenu(menuItem: any): void {
    // New menu item page load, do not decorate 16-digit case reference search box with error class
    this.appStore.dispatch(new fromAppStore.Decorate16DigitCaseReferenceSearchBoxInHeader(false));

    if (menuItem.href === '/noc') {
      this.nocStore.dispatch(new fromNocStore.Reset());
    }
  }

  private splitAndFilterNavItems(items: NavItemsModel[]): void {
    of(items).pipe(
      switchMap(unfilteredItems => this.filterNavItemsOnRole(unfilteredItems)),
      switchMap(roleFilteredItems => this.filterNavItemsOnFlag(roleFilteredItems)),
      map(filteredItems => this.splitNavItems(filteredItems))
    ).subscribe(sortedItems => {
      this.menuItems.left.next(sortedItems.left);
      this.menuItems.right.next(sortedItems.right);
    });
  }

  private splitNavItems(items: NavItemsModel[]): {right: NavItemsModel[], left: NavItemsModel[]} {
    return {
      right: items.filter(item => item.align && item.align === 'right'),
      left: items.filter(item => !item.align || item.align !== 'right')
    };
  }

  private filterNavItemsOnRole(items: NavItemsModel[]): Observable<NavItemsModel[]> {
    return this.userService.getUserDetails().pipe(
      map(details => details.userInfo.roles),
      map(roles => items.filter(item => (item.roles && item.roles.length > 0 ? item.roles.some(role => roles.includes(role)) : true)))
    );
  }

  private filterNavItemsOnFlag(items: NavItemsModel[]): Observable<NavItemsModel[]> {
    const flags: {[flag: string]: boolean} = {};
    const obs: Observable<boolean>[] = [];
    items.forEach(
      item => (item.flags || []).forEach(
        flag => obs.push(
          this.featureToggleService.isEnabled(flag).pipe(
            tap(state => flags[flag] = state)
          )
        )
      )
    );

    if (obs.length === 0) {
      return of(items);
    }

    return ((obs.length > 1 ? obs[0].combineLatest(obs.slice(1)) : obs[0]) as Observable<any>).pipe(
      map(_ => items.filter(item => item.flags && item.flags.length > 0 ? item.flags.every(flag => flags[flag]) : true))
    );
  }
}
