import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { ServiceDownComponent, CookiePolicyComponent, PrivacyPolicyComponent, TermsAndConditionsComponent,
          AccessibilityComponent, MediaViewerWrapperComponent} from './components';
import { GetHelpComponent } from './components/get-help/get-help.component';
import { SignedOutComponent } from './components/singed-out/signed-out.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'cases',
    pathMatch: 'full'
  },
  {
    path: 'cases',
    canActivate: [AuthGuard],
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
    path: 'signed-out',
    component: SignedOutComponent
  },
  {
    path: '**',
    redirectTo: '/cases',
    pathMatch: 'full'
  }
];
