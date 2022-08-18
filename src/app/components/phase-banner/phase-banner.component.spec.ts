import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RpxTranslationModule, RpxTranslationService } from 'rpx-xui-translation';
import { SessionStorageService } from 'src/app/services';
import { PhaseBannerComponent } from './phase-banner.component';

const mockSessionStorageService = {
  getItem: jasmine.createSpy('getItem').and.returnValue(JSON.parse('false')),
  setItem: jasmine.createSpy('setItem').and.returnValue(JSON.stringify('false'))
};

describe('PhaseBannerComponent', () => {
  let component: PhaseBannerComponent;
  let fixture: ComponentFixture<PhaseBannerComponent>;

  beforeEach(() => {
    const rpxTranslationServiceStub = () => ({ language: 'en', translate: () => {  } });
    TestBed.configureTestingModule({
      imports: [RpxTranslationModule.forChild()],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PhaseBannerComponent],
      providers: [
        {
          provide: RpxTranslationService,
          useFactory: rpxTranslationServiceStub
        },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
      ]
    });
    fixture = TestBed.createComponent(PhaseBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the feedback link', () => {
    const feedbackLinkClass = '.govuk-phase-banner .govuk-link';
    const feedbackLinkElement = fixture.debugElement.query(By.css(feedbackLinkClass)).nativeElement;
    const feedbackLinkSpanElement = fixture.debugElement.query(By.css(`${feedbackLinkClass} span.visuallyhidden`)).nativeElement;

    expect(feedbackLinkElement.getAttribute('target')).toBe('_blank');
    expect(feedbackLinkSpanElement.innerHTML).toEqual('');
  });

  it('should change the language', () => {
    component.toggleLanguage('en');
    expect(component.currentLang).toBe('en');
  });

});
