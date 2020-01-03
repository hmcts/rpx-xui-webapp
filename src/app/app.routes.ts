import { Routes } from '@angular/router';
import { AccessibilityComponent, CookiePolicyComponent, PrivacyPolicyComponent, ServiceDownComponent } from './components';
import { MediaViewerWrapperComponent } from './components/media-viewer-wrapper/media-viewer-wrapper.component';
import { AcceptTcWrapperComponent, TermsAndConditionsComponent } from './containers';
import { AcceptTermsGuard } from './guards/acceptTerms.guard';
import { AllowAcceptTermsGuard } from './guards/allowAcceptTerms.guard';
import { AuthGuard } from './services/auth/auth.guard';
import { ServiceDownComponent, CookiePolicyComponent, PrivacyPolicyComponent, TermsAndConditionsComponent,
          AccessibilityComponent, MediaViewerWrapperComponent} from './components';
import { GetHelpComponent } from './components/get-help/get-help.component';

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
    path: 'accept-terms-and-conditions',
    component: AcceptTcWrapperComponent,
    canActivate: [AllowAcceptTermsGuard]
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
    path: '**',
    redirectTo: '/cases',
    pathMatch: 'full'
  }
];
