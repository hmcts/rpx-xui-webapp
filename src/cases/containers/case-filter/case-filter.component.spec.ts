import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CaseUIToolkitModule,
  AlertService,
  HttpService,
  AuthService as CCDAuthService,
  CasesService,
  HttpErrorService,
  AbstractAppConfig,
  PlaceholderService,
  SearchService,
  RequestOptionsBuilder,
  SearchFiltersModule, CreateCaseFiltersModule,
} from '@hmcts/ccd-case-ui-toolkit';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { SharedModule } from '../../../app/shared/shared.module';
import { AppConfigService } from '../../../app/services/config/configuration.services';
import { CaseFilterComponent } from './case-filter.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { MockStore } from '@ngrx/store/testing';
import * as fromCaseCreate from '../../store/reducers';
import { Observable } from 'rxjs';
import * as fromCasesFeature from '../../store';

class MockSortService {
  features = {};
  getFeatureToggle() { }
  getEditorConfiguration() { }
}


describe('Case Filter Component', () => {

  beforeEach(() => {

  });

  it('should create 1', () => {

  });


});
