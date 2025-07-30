import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RpxTranslationService } from 'rpx-xui-translation';
import { SessionStorageService } from './../../../app/services';
import { PhaseBannerComponent } from './phase-banner.component';

const mockSessionStorageService = {
  getItem: jasmine.createSpy('getItem').and.returnValue(JSON.parse('false')),
  setItem: jasmine.createSpy('setItem').and.returnValue(JSON.stringify('false'))
};

@Pipe({
    name: 'rpxTranslate',
    standalone: false
})
class RpxTranslateMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('PhaseBannerComponent', () => {
  let component: PhaseBannerComponent;
  let fixture: ComponentFixture<PhaseBannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PhaseBannerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const rpxTranslationServiceStub = () => ({ language: 'en', translate: () => { }, getTranslation: (phrase: string) => phrase });
    TestBed.configureTestingModule({
      imports: [],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PhaseBannerComponent, RpxTranslateMockPipe],
      providers: [
        {
          provide: RpxTranslationService,
          useFactory: rpxTranslationServiceStub
        },
        { provide: SessionStorageService, useValue: mockSessionStorageService }
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
    expect(feedbackLinkSpanElement.innerHTML).toEqual('(Opens in a new window)');
  });

  it('should change the language', () => {
    component.toggleLanguage('en');
    expect(component.currentLang).toBe('en');
  });

  it('should close banner', () => {
    component.closeBanner();
    expect(component.noBanner).toEqual(false);
    expect(mockSessionStorageService.setItem).toHaveBeenCalled();
  });

  it('should set noBanner to true when language is "cy"', () => {
    component.toggleLanguage('cy');
    expect(component.noBanner).toBe(true);
  });

  it('should set noBanner to false when language is not "cy"', () => {
    component.toggleLanguage('en');
    expect(component.noBanner).toBe(false);
  });

  it('should update the language in langService', () => {
    component.toggleLanguage('en');
    expect(component.currentLang).toBe('en');
  });

  it('should create client context if not existing', () => {
    mockSessionStorageService.getItem.and.returnValue(null);
    component.toggleLanguage('en');
    expect(mockSessionStorageService.setItem).toHaveBeenCalledWith('clientContext', JSON.stringify({
      client_context: {
        user_language: {
          language: 'en'
        }
      }
    }));
  });

  it('should update client context if already existing', () => {
    const existingContext = {
      client_context: {
        some_other_data: 'data'
      }
    };
    mockSessionStorageService.getItem.and.returnValue(JSON.stringify(existingContext));
    component.toggleLanguage('en');
    expect(mockSessionStorageService.setItem).toHaveBeenCalledWith('clientContext', JSON.stringify({
      client_context: {
        some_other_data: 'data',
        user_language: {
          language: 'en'
        }
      }
    }));
  });
});
