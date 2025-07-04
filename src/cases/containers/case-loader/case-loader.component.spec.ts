import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PhaseBannerComponent } from '../../../app/components/phase-banner/phase-banner.component';
import { CaseLoaderComponent } from './case-loader.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Loader Component', () => {
  let component: CaseLoaderComponent;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let fixture: ComponentFixture<CaseLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CaseLoaderComponent, PhaseBannerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseLoaderComponent);
    component = new CaseLoaderComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
