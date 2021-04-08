import { ExtraOptions, Routes } from '@angular/router';
import {
  AccessibilityComponent,
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
  paramsInheritanceStrategy: 'always'
};

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'cases',
    pathMatch: 'full'
  },
  {
    path: 'cases',
    canActivate: [AuthGuard, AcceptTermsGuard],
    loadChildren: '../cases/cases.module#CasesModule'
  },
  {
    path: 'mywork',
    canActivate: [AuthGuard, AcceptTermsGuard],
    loadChildren: '../work-allocation/work-allocation.module#WorkAllocationModule'
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard, AcceptTermsGuard],
    loadChildren: '../work-allocation/work-allocation.module#WorkAllocationModule'
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
    loadChildren: '../noc/noc.module#NocModule'
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
    path: '**',
    redirectTo: '/cases',
    pathMatch: 'full'
  }
];
