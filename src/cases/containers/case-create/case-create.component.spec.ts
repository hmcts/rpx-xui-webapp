import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CaseUIToolkitModule,
  DraftService,
  AlertService,
  HttpService,
  AuthService as CCDAuthService,
  CasesService,
  HttpErrorService,
  AbstractAppConfig,
  CaseEditWizardGuard,
  RouterHelperService,
  DocumentManagementService,
  PageValidationService,
  PlaceholderService,
  SearchService,
  RequestOptionsBuilder,
  SearchFiltersModule,
} from '@hmcts/ccd-case-ui-toolkit';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../../app/shared/shared.module';
import { AppConfigService } from '../../../app/services/config/configuration.services';
import { CasesCreateComponent } from './case-create.component';
import * as fromCasesFeature from '../../store';
import * as fromCaseCreate from '../../store/reducers';
import { MockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

class MockSortService {
  features = {};
  getFeatureToggle() { }
  getEditorConfiguration() { }
}
describe('CaseCreateComponent', () => {

  beforeEach(() => {
  });

  it('should create', () => {
  });


});
