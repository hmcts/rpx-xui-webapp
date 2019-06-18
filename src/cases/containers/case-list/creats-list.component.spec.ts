import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CaseListComponent} from './case-list.component';
import {
  CaseUIToolkitModule, AbstractAppConfig, SearchService, RequestOptionsBuilder, SearchFiltersModule
} from '@hmcts/ccd-case-ui-toolkit';
import {AppConfig} from '../../../app/services/ccd-config/ccd-case.config';
import {ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../../app/shared/shared.module';
import {AppConfigService} from '../../../app/services/config/configuration.services';


describe('CaseListComponent', () => {
  let component: CaseListComponent;
  let fixture: ComponentFixture<CaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CaseUIToolkitModule,
        HttpClientModule,
        SharedModule,
        SearchFiltersModule,
      ],
      declarations: [ CaseListComponent ],
      providers: [
        RequestOptionsBuilder,
        {
          provide: SearchService,
          useValue: {
            requestOptionsBuilder: RequestOptionsBuilder
          }
        },
        {
          provide: AbstractAppConfig,
          useExisting: AppConfig
        },
        ScrollToService
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(CaseListComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
