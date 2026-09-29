import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { WAVerificationService } from '../../../work-allocation/services';
import { AppConstants } from '../../app.constants';
import { UserDetails, WAVerificationModel } from '../../models';
import { NavigationItem } from '../../models/theming.model';
import { HeaderConfigService } from '../../services/header-config/header-config.service';
import * as fromRoot from '../../store';
import { filterNavigationItemsByAccess } from '../../shared/utils/navigation-access.utils';

interface SitemapLink {
  text: string;
  href: string;
  accessHref: string;
}

export interface SitemapSection {
  heading: string;
  links: SitemapLink[];
}

const sitemapSections: SitemapSection[] = [
  {
    heading: 'Case management',
    links: [
      { text: 'Case list', href: '/cases', accessHref: '/cases' },
      { text: 'Create case', href: '/cases/case-filter', accessHref: '/cases/case-filter' },
      { text: 'Find case', href: '/cases/case-search', accessHref: '/cases/case-search' },
      { text: 'Search cases', href: '/search', accessHref: '/search' },
      { text: 'Notice of change', href: '/noc', accessHref: '/noc' },
      { text: 'Refunds', href: '/refunds', accessHref: '/refunds' },
    ],
  },
  {
    heading: 'Work allocation',
    links: [
      { text: 'My work', href: '/work/my-work/list', accessHref: '/work/my-work/list' },
      { text: 'Available tasks', href: '/work/my-work/available', accessHref: '/work/my-work/list' },
      { text: 'My cases', href: '/work/my-work/my-cases', accessHref: '/work/my-work/list' },
      { text: 'My access', href: '/work/my-work/my-access', accessHref: '/work/my-work/list' },
      { text: 'All work', href: '/work/all-work/tasks', accessHref: '/work/all-work/tasks' },
      { text: 'All work cases', href: '/work/all-work/cases', accessHref: '/work/all-work/tasks' },
      { text: 'Work access', href: '/booking', accessHref: '/booking' },
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
  public sitemapSections$: Observable<SitemapSection[]>;

  constructor(
    private readonly store: Store<fromRoot.State>,
    private readonly headerConfigService: HeaderConfigService,
    private readonly waVerificationService: WAVerificationService
  ) {}

  public ngOnInit(): void {
    this.sitemapSections$ = this.store.pipe(
      select(fromRoot.getUserDetails),
      filter((userDetails: UserDetails) => !!userDetails?.userInfo),
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
