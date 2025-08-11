import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppConfigService } from './configuration.services';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { of } from 'rxjs';

describe('Configuration Service', () => {
  let service: AppConfigService;
  let httpMock: HttpTestingController;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: { destroyAfterEach: false },
      imports: [StoreModule.forRoot({})],
      providers: [AppConfigService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    });
    service = TestBed.inject(AppConfigService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should have configuration service', () => {
    expect(service).toBeTruthy();
  });

  it('should load configuration from JSON file successfully', () => {
    const mockConfig = {
      features: { someFeature: true },
      caseEditorConfig: { someConfig: 'value' },
      urls: { someUrl: '/api' }
    };

    service.load().subscribe((data) => {
      expect(data).toEqual(mockConfig);
    });

    const req = httpMock.expectOne('assets/config/config.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockConfig);
  });

  it('should handle HTTP error when loading configuration', () => {
    const errorMessage = 'Something bad happened; please try again later.';

    service.load().subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error) => {
        expect(error).toEqual(errorMessage);
      }
    });

    const req = httpMock.expectOne('assets/config/config.json');
    req.flush('404 error', { status: 404, statusText: 'Not Found' });
  });

  it('should handle client-side error when loading configuration', () => {
    const errorMessage = 'Something bad happened; please try again later.';

    service.load().subscribe({
      next: () => fail('should have failed with network error'),
      error: (error) => {
        expect(error).toEqual(errorMessage);
      }
    });

    const req = httpMock.expectOne('assets/config/config.json');
    req.flush(null, { status: 0, statusText: 'Unknown Error' });
  });

  it('should set configuration from store', () => {
    const mockConfig = {
      features: { testFeature: true },
      caseEditorConfig: { editor: 'config' },
      urls: { api: '/test' }
    };

    spyOn(store, 'pipe').and.returnValue(of(mockConfig));

    service.setConfiguration();

    expect(store.pipe).toHaveBeenCalled();
    expect(service['configuration']).toEqual(mockConfig);
  });

  it('should return feature toggle configuration', () => {
    const mockFeatures = { feature1: true, feature2: false };
    service['configuration'] = { features: mockFeatures };

    const result = service.getFeatureToggle();

    expect(result).toEqual(mockFeatures);
  });

  it('should return editor configuration', () => {
    const mockEditorConfig = { someEditorSetting: 'value' };
    service['configuration'] = { caseEditorConfig: mockEditorConfig };

    const result = service.getEditorConfiguration();

    expect(result).toEqual(mockEditorConfig);
  });

  it('should return routes configuration', () => {
    const mockRoutesConfig = { api: '/api/v1', auth: '/auth' };
    service['configuration'] = { urls: mockRoutesConfig };

    const result = service.getRoutesConfig();

    expect(result).toEqual(mockRoutesConfig);
  });

  it('should have configuration service getFeatureToggle method', () => {
    expect(service.getFeatureToggle).toBeTruthy();
  });

  it('should have configuration service setConfiguration method', () => {
    expect(service.setConfiguration).toBeTruthy();
  });

  it('should have configuration service getEditorConfiguration method', () => {
    expect(service.getEditorConfiguration).toBeTruthy();
  });

  it('should have configuration service getRoutesConfig method', () => {
    expect(service.getRoutesConfig).toBeTruthy();
  });
});
