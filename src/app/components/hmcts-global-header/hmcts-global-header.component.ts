import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
  @Input() public headerTitle: {name: string; url: string};
  @Input() public navigation: UserNavModel;
  @Input() public logoType: string;
  @Input() public currentUrl: string;
  @Output() public navigate = new EventEmitter<string>();

  public showItems: boolean;
  public userValue = true;
  public tab;
  public get leftItems(): Observable<NavItemsModel[]> {
    return this.menuItems.left.asObservable();
  };
  public get rightItems(): Observable<NavItemsModel[]> {
    return this.menuItems.right.asObservable();
  };

  private menuItems = {
    left: new BehaviorSubject<NavItemsModel[]>([]),
    right: new BehaviorSubject<NavItemsModel[]>([])
  };

  constructor(
    public nocStore: Store<fromNocStore.State>,
    private readonly userService: UserService,
    private readonly featureToggleService: FeatureToggleService
  ) { }

  public async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes.items.currentValue !== changes.items.previousValue) {
      await this.splitAndFilterNavItems(this.items);
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

  private async splitAndFilterNavItems(items: NavItemsModel[]) {
    items = await this.filterNavItems(this.items);
    this.splitNavItems(items);
  }

  private splitNavItems(items: NavItemsModel[]) {
    this.menuItems.right.next(items.filter(item => item.align && item.align === 'right'));
    this.menuItems.left.next(items.filter(item => !item.align || item.align !== 'right'));
  }

  private async filterNavItems(items: NavItemsModel[]): Promise<NavItemsModel[]> {
    items = await this.filterNavItemsOnRole(items);
    items = await this.filterNavItemsOnFlag(items);
    return items;
  }

  private async filterNavItemsOnRole(items: NavItemsModel[]): Promise<NavItemsModel[]> {
    return this.userService.getUserDetails().pipe(
      map(details => details.userInfo.roles),
      map(roles => items.filter(item => (item.roles && item.roles.length > 0 ? item.roles.some(role => roles.includes(role)) : true)))
    ).toPromise();
  }

  private async filterNavItemsOnFlag(items: NavItemsModel[]): Promise<NavItemsModel[]> {
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
    if (obs.length > 1) {
      await obs[0].combineLatest(obs.slice(1)).toPromise();
    } else if (obs.length > 0) {
      await obs[0].toPromise();
    } else {
      return items; // no flags found, so nothing to filter
    }
    return items.filter(item => item.flags && item.flags.length > 0 ? item.flags.every(flag => flags[flag]) : true)
  }
}
