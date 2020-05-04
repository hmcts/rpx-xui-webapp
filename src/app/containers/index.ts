import { AcceptTcWrapperComponent } from './accept-tc.wrapper/accept-tc-wrapper.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ExuiCcdConnectorComponent } from './exiu-ccd-connector-wrapper/exui-ccd-connector.component';
import { FooterComponent } from './footer/footer.component';
import { LegacyTermsAndConditionsComponent } from './legacy-terms-and-conditions/legacy-terms-and-conditions.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';

export const containers: any[] = [
  ExuiCcdConnectorComponent,
  FooterComponent,
  AppHeaderComponent,
  TermsAndConditionsComponent,
  AcceptTcWrapperComponent,
  LegacyTermsAndConditionsComponent
];

export * from './accept-tc.wrapper/accept-tc-wrapper.component';
export * from './app-header/app-header.component';
export * from './exiu-ccd-connector-wrapper/exui-ccd-connector.component';
export * from './footer/footer.component';
export * from './terms-and-conditions/terms-and-conditions.component';
export * from './legacy-terms-and-conditions/legacy-terms-and-conditions.component';
