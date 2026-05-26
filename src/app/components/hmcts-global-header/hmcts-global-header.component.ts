import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store, select } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, skipWhile, switchMap } from 'rxjs/operators';
import { UserDetails } from '../../../app/models/user-details.model';
import * as fromAppStore from '../../../app/store';
import * as fromNocStore from '../../../noc/store';
import { SearchStatePersistenceKey } from '../../../search/enums';
import { SearchService } from '../../../search/services/search.service';
import { NavigationItem, UserNavModel } from '../../models';
import { UserService } from '../../services/user/user.service';
import { AppConstants } from 'src/app/app.constants';
import { filterNavigationItemsByFlags, filterNavigationItemsByRoles } from '../../shared/utils/navigation-access.utils';

@Component({
  standalone: false,
  selector: 'exui-hmcts-global-header',
  templateUrl: './hmcts-global-header.component.html',
  styleUrls: ['./hmcts-global-header.component.scss'],
})
export class HmctsGlobalHeaderComponent implements OnInit, OnChanges {
  private static readonly GLOBAL_SEARCH_FEATURE_CONFIG = 'feature-global-search';

  @Input() public set showNavItems(value: boolean) {
    this.showItems = value;
  }

  @Input() public items: NavigationItem[];
  @Input() public logoIsUsed: boolean;
  @Input() public headerTitle: { name: string; url: string };
  @Input() public navigation: UserNavModel;
  @Input() public logo: string;
  @Input() public currentUrl: string;
  @Input() public decorate16DigitCaseReferenceSearchBoxInHeader: boolean;
  @Output() public navigate = new EventEmitter<string>();

  public showItems = false;
  public userValue = true;
  public tab;
  public userDetails$: Observable<UserDetails>;
  public isUserCaseManager$: Observable<boolean>;
  public isGlobalSearchEnabled: boolean;
  public get leftItems(): Observable<NavigationItem[]> {
    return this.menuItems.left.asObservable();
  }

  public get rightItems(): Observable<NavigationItem[]> {
    return this.menuItems.right.asObservable();
  }

  private readonly menuItems = {
    left: new BehaviorSubject<NavigationItem[]>([]),
    right: new BehaviorSubject<NavigationItem[]>([]),
  };

  constructor(
    private readonly appStore: Store<fromAppStore.State>,
    private readonly nocStore: Store<fromNocStore.State>,
    private readonly userService: UserService,
    private readonly featureToggleService: FeatureToggleService,
    private readonly searchService: SearchService
  ) {}

  public ngOnInit(): void {
    this.userDetails$ = this.appStore.pipe(select(fromAppStore.getUserDetails));
    this.isUserCaseManager$ = this.userDetails$.pipe(
      skipWhile((details) => !('userInfo' in details)),
      map((details) => details?.userInfo?.roles),
      map((roles) => {
        const givenRoles = [
          'pui-case-manager',
          'caseworker-ia-legalrep-solicitor',
          'caseworker-ia-homeofficeapc',
          'caseworker-ia-respondentofficer',
          'caseworker-ia-homeofficelart',
          'caseworker-ia-homeofficepou',
        ];
        return givenRoles.filter((x) => roles.includes(x)).length > 0;
      })
    );
    this.isGlobalSearchEnabled = AppConstants.MENU_FLAGS['feature-global-search'];
    this.splitAndFilterNavItems(this.items);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.items?.currentValue !== changes.items?.previousValue) {
      this.splitAndFilterNavItems(this.items);
    }
  }

  public onEmitEvent(index: number): void {
    this.navigate.emit(this.navigation.items[index].emit);
  }

  public onEmitSubMenu(menuItem: any): void {
    // New menu item page load, do not decorate 16-digit case reference search box with error class
    this.appStore.dispatch(new fromAppStore.Decorate16DigitCaseReferenceSearchBoxInHeader(false));

    // Clear the search parameters from session
    this.searchService.storeState(SearchStatePersistenceKey.SEARCH_PARAMS, null);

    if (menuItem.href === '/noc') {
      this.nocStore.dispatch(new fromNocStore.Reset());
    }
  }

  private splitAndFilterNavItems(items: NavigationItem[]): void {
    items = items || [];
    of(items)
      .pipe(
        switchMap((unfilteredItems) => this.filterNavItemsOnRole(unfilteredItems)),
        switchMap((roleFilteredItems) => this.filterNavItemsOnFlag(roleFilteredItems)),
        map((filteredItems) => this.splitNavItems(filteredItems))
      )
      .subscribe((sortedItems) => {
        this.menuItems.left.next(sortedItems.left);
        this.menuItems.right.next(sortedItems.right);
      });
  }

  private splitNavItems(items: NavigationItem[]): { right: NavigationItem[]; left: NavigationItem[] } {
    items = items || [];
    return {
      right: items.filter((item) => item.align && item.align === 'right'),
      left: items.filter((item) => !item.align || item.align !== 'right'),
    };
  }

  private filterNavItemsOnRole(items: NavigationItem[]): Observable<NavigationItem[]> {
    items = items || [];
    const userDetails$ = this.appStore.pipe(select(fromAppStore.getUserDetails));
    return userDetails$.pipe(
      skipWhile((details) => !('userInfo' in details)),
      map((details) => details?.userInfo?.roles),
      map((roles) => filterNavigationItemsByRoles(items, roles))
    );
  }

  private filterNavItemsOnFlag(items: NavigationItem[]): Observable<NavigationItem[]> {
    return of(filterNavigationItemsByFlags(items, AppConstants.MENU_FLAGS));
  }
}
