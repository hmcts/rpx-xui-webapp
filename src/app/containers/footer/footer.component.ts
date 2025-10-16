import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppConstants } from '../../app.constants';
import * as fromRoot from '../../store';
import { Helper, Navigation, NavigationItems } from './footer.model';

@Component({
  standalone: false,
  selector: 'exui-app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']

})

export class FooterComponent implements OnInit {
  public helpData: Helper = AppConstants.FOOTER_DATA;
  public navigationData: Navigation = AppConstants.FOOTER_DATA_NAVIGATION;

  constructor(private readonly store: Store<fromRoot.State>) {}

  public ngOnInit() {
    const tAndCNavItem = this.getNavigationItemForTandC(this.navigationData.items);
    if (tAndCNavItem) {
      this.store.pipe(
        select(fromRoot.getIsTermsAndConditionsFeatureEnabled)
      ).subscribe((isEnabled) => {
        tAndCNavItem.href = isEnabled ? '/terms-and-conditions' : '/legacy-terms-and-conditions';
      });
    }
  }

  public getNavigationItemForTandC(navigationItems: NavigationItems[]): NavigationItems {
    let navItem: NavigationItems = null;
    navigationItems.forEach((currentNavItem) => {
      if (currentNavItem.text === 'Terms and conditions') {
        navItem = currentNavItem;
      }
    });
    return navItem;
  }
}
