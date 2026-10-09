import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { WAVerificationService } from '../../../work-allocation/services';
import { AppConstants, getTermsAndConditionsHref } from '../../app.constants';
import { UserDetails, WAVerificationModel } from '../../models';
import { NavigationItem } from '../../models/theming.model';
import { HeaderConfigService } from '../../services/header-config/header-config.service';
import * as fromRoot from '../../store';
import { filterNavigationItemsByAccess } from '../../shared/utils/navigation-access.utils';
import { getApplicationThemeForUserRoles } from '../../shared/utils/application-theme.utils';
import { SitemapSection, sitemapSections } from './sitemap-sections';

@Component({
  standalone: false,
  selector: 'exui-sitemap',
  templateUrl: './sitemap.component.html',
})
export class SitemapComponent implements OnInit {
  public applicationTitle$: Observable<string>;
  public sitemapSections$: Observable<SitemapSection[]>;
  public termsAndConditionsHref$: Observable<string>;

  constructor(
    private readonly store: Store<fromRoot.State>,
    private readonly headerConfigService: HeaderConfigService,
    private readonly waVerificationService: WAVerificationService
  ) {}

  public ngOnInit(): void {
    this.termsAndConditionsHref$ = this.store.pipe(
      select(fromRoot.getIsTermsAndConditionsFeatureEnabled),
      map((isEnabled) => getTermsAndConditionsHref(isEnabled))
    );

    const userDetails$ = this.store.pipe(
      select(fromRoot.getUserDetails),
      filter((userDetails: UserDetails) => !!userDetails?.userInfo),
      shareReplay(1)
    );

    this.applicationTitle$ = userDetails$.pipe(
      map((userDetails) => getApplicationThemeForUserRoles(userDetails.userInfo.roles ?? []).appTitle.name),
      startWith(AppConstants.DEFAULT_USER_THEME.appTitle.name)
    );

    this.sitemapSections$ = userDetails$.pipe(
      switchMap((userDetails) => {
        const userRoles = userDetails.userInfo.roles ?? [];

        return combineLatest([
          this.headerConfigService.constructHeaderConfig(userRoles),
          this.waVerificationService.getWAVerification(),
        ]).pipe(
          map(([headerItems, waVerification]) =>
            this.getVisibleSitemapSections(headerItems, userDetails, waVerification, userRoles)
          )
        );
      })
    );
  }

  private getVisibleSitemapSections(
    headerItems: NavigationItem[],
    userDetails: UserDetails,
    waVerification: WAVerificationModel,
    userRoles: string[]
  ): SitemapSection[] {
    const visibleHeaderItems = filterNavigationItemsByAccess(headerItems, userRoles, AppConstants.MENU_FLAGS, {
      userDetails,
      waVerification,
    });
    const visibleNavigationHrefs = new Set(visibleHeaderItems.map((item) => item.href));

    return sitemapSections
      .map((section) => ({
        ...section,
        links: section.links.filter((link) => visibleNavigationHrefs.has(link.accessHref)),
      }))
      .filter((section) => section.links.length > 0);
  }
}
