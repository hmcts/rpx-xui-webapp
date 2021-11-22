import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as fromNocStore from '../../../noc/store';
import { NavItemsModel } from '../../models/nav-item.model';
import { UserNavModel } from '../../models/user-nav.model';
import { UserService } from '../../services/user/user.service';
import { SearchService } from '../../../search/services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoResultsMessageId, SearchStatePersistenceKey } from '../../../search/enums';
import { SearchParameters } from '../../../search/models';

@Component({
    selector: 'exui-hmcts-global-header',
    templateUrl: './hmcts-global-header.component.html',
    styleUrls: ['./hmcts-global-header.component.scss']
})
export class HmctsGlobalHeaderComponent implements OnChanges, OnDestroy {

  @Input() public set showNavItems(value: boolean) {
		console.log('this.showItems before', this.showItems);
    this.showItems = value === null && value === undefined ? false : value;
		console.log('this.showItems after', this.showItems);
  }
  @Input() public items: NavItemsModel[];
  @Input() public logoIsUsed: boolean;
  @Input() public showFindCase: boolean;
  @Input() public showCaseReferenceSearchBox: boolean;
  @Input() public headerTitle: {name: string; url: string};
  @Input() public navigation: UserNavModel;
  @Input() public logoType: string;
  @Input() public currentUrl: string;
  @Output() public navigate = new EventEmitter<string>();

  public showItems = false;
  public userValue = true;
  public tab;
  public get leftItems(): Observable<NavItemsModel[]> {
    return this.menuItems.left.asObservable();
  };
  public get rightItems(): Observable<NavItemsModel[]> {
    return this.menuItems.right.asObservable();
  };
  public searchSubscription$: Subscription;

  private menuItems = {
    left: new BehaviorSubject<NavItemsModel[]>([]),
    right: new BehaviorSubject<NavItemsModel[]>([])
  };

  constructor(
    public nocStore: Store<fromNocStore.State>,
    private readonly userService: UserService,
    private readonly featureToggleService: FeatureToggleService,
    private readonly searchService: SearchService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
	  this.splitAndFilterNavItems(this.items);
  }

  public onEmitEvent(index: number): void {
    this.navigate.emit(this.navigation.items[index].emit);
  }

  public onEmitSubMenu(menuItem: any) {
    if (menuItem.href === '/noc') {
      this.nocStore.dispatch(new fromNocStore.Reset());
    }
  }

  public onSearchCase(caseReference): void {
    // Populate a SearchParameters instance and persist via the SearchService
    const searchParameters: SearchParameters = {
      caseReferences: [caseReference],
      CCDJurisdictionIds: null,
      otherReferences: null,
      fullName: null,
      address: null,
      postcode: null,
      emailAddress: null,
      dateOfBirth: null,
      dateOfDeath: null
    };

    // Store the search parameters to session
    this.searchService.storeState(SearchStatePersistenceKey.SEARCH_PARAMS, searchParameters);

    this.searchSubscription$ = this.searchService.getResults().subscribe(result => {
      if (result.resultInfo.casesReturned > 0) {
        this.router.navigate([`/cases/case-details/${result.results[0].caseReference}`], { relativeTo: this.route });
      } else {
        this.router.navigate(['/search/noresults', NoResultsMessageId.NO_RESULTS_FROM_HEADER_SEARCH], { relativeTo: this.route });
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.searchSubscription$) {
      this.searchSubscription$.unsubscribe();
    }
  }

  private splitAndFilterNavItems(items: NavItemsModel[]) {
    of(items).pipe(
      switchMap(unfilteredItems => this.filterNavItemsOnRole(unfilteredItems)),
      switchMap(roleFilteredItems => this.filterNavItemsOnFlag(roleFilteredItems)),
      map(filteredItems => this.splitNavItems(filteredItems))
    ).subscribe(sortedItems => {
      this.menuItems.left.next(sortedItems.left);
      this.menuItems.right.next(sortedItems.right);
    });
  }

  private splitNavItems(items: NavItemsModel[]) {
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
