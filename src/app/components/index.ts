import { AccessForbiddenComponent } from './access-forbidden/access-forbidden.component';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { CookiePolicyComponent } from './cookie-policy/cookie-policy.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { GetHelpComponent } from './get-help/get-help.component';
import { HeaderComponent } from './header/header.component';
import { HmctsGlobalFooterComponent } from './hmcts-global-footer/hmcts-global-footer.component';
import { HmctsGlobalHeaderComponent } from './hmcts-global-header/hmcts-global-header.component';
import { HmctsPrimaryNavigationComponent } from './hmcts-primary-navigation/hmcts-primary-navigation.component';
import { MediaViewerWrapperComponent } from './media-viewer-wrapper/media-viewer-wrapper.component';
import { NotAuthorisedComponent } from './not-authorised/not-authorised.component';
import { PhaseBannerComponent } from './phase-banner/phase-banner.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ServiceDownComponent } from './service-down/service-down.component';
import { SignedOutComponent } from './signed-out/signed-out.component';

export const components: any[] = [
  HmctsGlobalFooterComponent,
  HeaderComponent,
  HmctsGlobalHeaderComponent,
  HmctsPrimaryNavigationComponent,
  CookiePolicyComponent,
  NotAuthorisedComponent,
  PrivacyPolicyComponent,
  AccessibilityComponent,
  PhaseBannerComponent,
  ServiceDownComponent,
  AccessForbiddenComponent,
  ErrorMessageComponent,
  MediaViewerWrapperComponent,
  GetHelpComponent,
  SignedOutComponent
];

export * from './hmcts-global-footer/hmcts-global-footer.component';
export * from './header/header.component';
export * from './hmcts-global-header/hmcts-global-header.component';
export * from './hmcts-primary-navigation/hmcts-primary-navigation.component';
export * from './phase-banner/phase-banner.component';
export * from './service-down/service-down.component';
export * from './error-message/error-message.component';
export * from './access-forbidden/access-forbidden.component';
export * from './cookie-policy/cookie-policy.component';
export * from './privacy-policy/privacy-policy.component';
export * from './accessibility/accessibility.component';
export * from './media-viewer-wrapper/media-viewer-wrapper.component';
export * from './get-help/get-help.component';
export * from './signed-out/signed-out.component';
export * from './not-authorised/not-authorised.component';
