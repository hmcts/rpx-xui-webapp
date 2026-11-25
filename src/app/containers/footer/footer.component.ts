import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../../app.constants';
import { DeploymentEnvironmentEnum } from '../../enums/deployment-environment-enum';
import { UserDetails } from '../../models/user-details.model';
import { EnvironmentService } from '../../shared/services/environment.service';
import * as fromRoot from '../../store';
import { Helper, Navigation, NavigationItems } from './footer.model';

@Component({
  standalone: false,
  selector: 'exui-app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public helpData: Helper = AppConstants.FOOTER_DATA;
  public navigationData: Navigation = AppConstants.FOOTER_DATA_NAVIGATION;
  public userEmail$: Observable<string>;

  constructor(
    private readonly store: Store<fromRoot.State>,
    private readonly environmentService: EnvironmentService
  ) {}

  public ngOnInit() {
    if (this.environmentService.getDeploymentEnv() !== DeploymentEnvironmentEnum.PROD) {
      this.userEmail$ = this.store.pipe(
        select(fromRoot.getUserDetails),
        map((userDetails: UserDetails) => userDetails?.userInfo?.email)
      );
    }

    const tAndCNavItem = this.getNavigationItemForTandC(this.navigationData.items);
    if (tAndCNavItem) {
      this.store.pipe(select(fromRoot.getIsTermsAndConditionsFeatureEnabled)).subscribe((isEnabled) => {
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
