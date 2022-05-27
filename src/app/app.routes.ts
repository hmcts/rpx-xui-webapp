import { ExtraOptions, Routes } from '@angular/router';
import { FeatureToggleGuard } from '@hmcts/rpx-xui-common-lib';
import {
  AccessibilityComponent,
  ApplicationRoutingComponent,
  CookiePolicyComponent,
  GetHelpComponent,
  MediaViewerWrapperComponent,
  NotAuthorisedComponent,
  PrivacyPolicyComponent,
  ServiceDownComponent,
  SignedOutComponent,
} from './components';
import { AcceptTcWrapperComponent, LegacyTermsAndConditionsComponent, TermsAndConditionsComponent } from './containers';
import { AcceptTermsGuard } from './guards/acceptTerms.guard';
import { AuthGuard } from './services/auth/auth.guard';

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
  scrollPositionRestoration: 'enabled'
};

export const ROUTES: Routes = [
  {
    path: '',
    component: ApplicationRoutingComponent,
    pathMatch: 'full'
  },
  {
    path: 'cases',
    canActivate: [AuthGuard, AcceptTermsGuard],
    loadChildren: () => import('../cases/cases.module').then(m => m.CasesModule)
  },
  {
    path: 'work',
    canActivate: [AuthGuard, AcceptTermsGuard],
    loadChildren: () => import('../work-allocation-2/work-allocation2.module').then(m => m.WorkAllocationModule2)
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard, AcceptTermsGuard],
    loadChildren: () => import('../work-allocation/work-allocation.module').then(m => m.WorkAllocationModule)
  },
  {
    path: 'role-access',
    canActivate: [AuthGuard, AcceptTermsGuard],
    loadChildren: () => import('../role-access/role-access.module').then(m => m.RoleAccessModule)
  },
  // TODO: remove redundant redirections
  { path: 'case/:jurisdiction/:case-type/:cid', redirectTo: 'cases/case-details/:cid', pathMatch: 'full' },
  { path: 'case/:cid', redirectTo: 'cases/case-details/:cid', pathMatch: 'full' },
  { path: 'case-details/:cid', redirectTo: 'cases/case-details/:cid', pathMatch: 'full' },
  { path: 'v2/case/:cid', redirectTo: 'cases/case-details/:cid', pathMatch: 'full' },
  {
    path: 'case/:jurisdiction/:case-type/:cid/trigger/:triggerPath',
    redirectTo: 'cases/case-details/:cid/trigger/:triggerPath', pathMatch: 'full'
  },
  {
    path: 'case/:jurisdiction/:case-type/:cid/trigger/:triggerPath/:triggerPath2',
    redirectTo: 'cases/case-details/:cid/trigger/:triggerPath/:triggerPath2', pathMatch: 'full'
  },
  {
    path: 'noc',
    canActivate: [AuthGuard, AcceptTermsGuard],
    loadChildren: () => import('../noc/noc.module').then(m => m.NocModule)
  },
  {
    path: 'hearings',
    canActivate: [AuthGuard, AcceptTermsGuard],
    loadChildren: '../hearings/hearings.module#HearingsModule'
  },
  {
    path: 'cookies',
    component: CookiePolicyComponent,
    data: {
      title: 'Cookie Policy'
    }
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: {
      title: 'Privacy Policy'
    }
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent,
    data: {
      title: 'Terms and Conditions'
    }
  },
  {
    path: 'legacy-terms-and-conditions',
    component: LegacyTermsAndConditionsComponent,
    data: {
      title: 'Terms and Conditions'
    }
  },
  {
    path: 'accept-terms-and-conditions',
    component: AcceptTcWrapperComponent,
    data: {
      title: 'Accept Terms and Conditions'
    }
  },
  {
    path: 'accessibility',
    component: AccessibilityComponent,
    data: {
      title: 'Accessibility Statement'
    }
  },
  {
    path: 'service-down',
    component: ServiceDownComponent,
    data: {
      title: 'Service Unavailable'
    }
  },
  {
    path: 'media-viewer',
    component: MediaViewerWrapperComponent,
    data: {
      title: 'View Document'
    }
  },
  { path: 'service-down', component: ServiceDownComponent },
  { path: 'not-authorised', component: NotAuthorisedComponent },
  { path: 'media-viewer', component: MediaViewerWrapperComponent },
  {
    path: 'get-help',
    component: GetHelpComponent,
    data: {
      title: 'Get Help'
    }
  },
  {
    path: 'idle-sign-out',
    component: SignedOutComponent,
    data: {
      title: 'You have been signed out'
    }
  },
  {
    path: 'refunds',
    canActivate: [AuthGuard, AcceptTermsGuard, FeatureToggleGuard],
    loadChildren: () => import('../refunds/refunds.module').then(m => m.RefundsModule),
    data: {
      title: 'Refunds',
      needsFeaturesEnabled: ['feature-refunds'],
      featureDisabledRedirect: '/'
    }
  },
  {
    path: '**',
    redirectTo: '/cases',
    pathMatch: 'full'
  }
];
