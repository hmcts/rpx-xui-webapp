import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RpxTranslationModule, RpxTranslationService } from 'rpx-xui-translation';
import { PhaseBannerComponent } from './phase-banner.component';

describe('PhaseBannerComponent', () => {
  let component: PhaseBannerComponent;
  let fixture: ComponentFixture<PhaseBannerComponent>;

  beforeEach(() => {
    const rpxTranslationServiceStub = () => ({ language: 'en' });
    TestBed.configureTestingModule({
      imports: [RpxTranslationModule.forChild()],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PhaseBannerComponent],
      providers: [
        {
          provide: RpxTranslationService,
          useFactory: rpxTranslationServiceStub
        }
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
    expect(feedbackLinkElement.innerHTML).toContain('feedback');
    expect(feedbackLinkSpanElement.innerHTML).toEqual('(Opens in a new window)');
  });

});
