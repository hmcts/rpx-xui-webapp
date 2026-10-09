import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { WAVerificationService } from '../../../work-allocation/services';
import { AppConstants, getTermsAndConditionsHref } from '../../app.constants';
import { UserDetails, WAVerificationModel } from '../../models';
import { ApplicationTheme, NavigationItem } from '../../models/theming.model';
import { HeaderConfigService } from '../../services/header-config/header-config.service';
import * as fromRoot from '../../store';
import { filterNavigationItemsByAccess } from '../../shared/utils/navigation-access.utils';
import { environment } from '../../../environments/environment';
import { getUserRolesExcludingSpecificAccessApprover } from '../../shared/utils/role.utils';

interface SitemapLink {
  text: string;
  href: string;
  accessHref: string;
}

export interface SitemapSection {
  heading: string;
  links: SitemapLink[];
}

function getApplicationTitleForUserRoles(userRoles: string[] = []): string {
  const availableThemes = environment.themes;
  const userRolesForTheme = getUserRolesExcludingSpecificAccessApprover(userRoles);
  const themeRegex =
    Object.keys(availableThemes).find((key) => userRolesForTheme.some((role) => new RegExp(key).test(role))) || '.+';

  return (availableThemes[themeRegex] as ApplicationTheme).appTitle.name;
}

const sitemapSections: SitemapSection[] = [
  {
    heading: 'My work',
    links: [
      { text: 'My tasks', href: '/work/my-work/list', accessHref: '/work/my-work/list' },
      { text: 'Available tasks', href: '/work/my-work/available', accessHref: '/work/my-work/list' },
      { text: 'My cases', href: '/work/my-work/my-cases', accessHref: '/work/my-work/list' },
      { text: 'My access', href: '/work/my-work/my-access', accessHref: '/work/my-work/list' },
    ],
  },
  {
    heading: 'All work',
    links: [
      { text: 'Tasks', href: '/work/all-work/tasks', accessHref: '/work/all-work/tasks' },
      { text: 'Cases', href: '/work/all-work/cases', accessHref: '/work/all-work/tasks' },
      { text: 'Work access', href: '/booking', accessHref: '/booking' },
    ],
  },
  {
    heading: 'Case management',
    links: [
      { text: 'Case list', href: '/cases', accessHref: '/cases' },
      { text: 'Create case', href: '/cases/case-filter', accessHref: '/cases/case-filter' },
      { text: 'Find case', href: '/cases/case-search', accessHref: '/cases/case-search' },
      { text: 'Search', href: '/search', accessHref: '/search' },
      { text: 'Notice of change', href: '/noc', accessHref: '/noc' },
      { text: 'Refunds', href: '/refunds', accessHref: '/refunds' },
    ],
  },
  {
    heading: 'Staff administration',
    links: [{ text: 'Staff', href: '/staff', accessHref: '/staff' }],
  },
];

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
      map((userDetails) => getApplicationTitleForUserRoles(userDetails.userInfo.roles ?? [])),
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
