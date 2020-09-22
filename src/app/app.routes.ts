import { Routes } from '@angular/router';
import { AccessibilityComponent, CookiePolicyComponent, MediaViewerWrapperComponent,
          PrivacyPolicyComponent, ServiceDownComponent} from './components';
import { GetHelpComponent } from './components/get-help/get-help.component';
import { AcceptTcWrapperComponent, TermsAndConditionsComponent } from './containers';
import { LegacyTermsAndConditionsComponent } from './containers/legacy-terms-and-conditions/legacy-terms-and-conditions.component';
import { AcceptTermsGuard } from './guards/acceptTerms.guard';
import { AllowAcceptTermsGuard } from './guards/allowAcceptTerms.guard';
import { AuthGuard } from './services/auth/auth.guard';
import { SignedOutComponent } from './components/signed-out/signed-out.component';

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
    component: CookiePolicyComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent
  },
  {
    path: 'legacy-terms-and-conditions',
    component: LegacyTermsAndConditionsComponent
  },
  {
    path: 'accept-terms-and-conditions',
    component: AcceptTcWrapperComponent
  },
  {
    path: 'accessibility',
    component: AccessibilityComponent
  },
  { path: 'service-down', component: ServiceDownComponent },
  { path: 'media-viewer', component: MediaViewerWrapperComponent },
  {
    path: 'get-help',
    component: GetHelpComponent
  },
  {
    path: 'idle-sign-out',
    component: SignedOutComponent
  },
  {
    path: '**',
    redirectTo: '/cases',
    pathMatch: 'full'
  }
];
