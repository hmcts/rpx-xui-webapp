import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RpxLanguage, RpxTranslationService } from 'rpx-xui-translation';
import { BehaviorSubject } from 'rxjs';
import { SessionStorageService } from './../../../app/services';
import { PhaseBannerComponent } from './phase-banner.component';

const mockSessionStorageService = {
  getItem: jasmine.createSpy('getItem').and.returnValue(JSON.parse('false')),
  setItem: jasmine.createSpy('setItem').and.returnValue(JSON.stringify('false')),
};

@Pipe({
  standalone: false,
  name: 'rpxTranslate',
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
      declarations: [PhaseBannerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    const rpxTranslationServiceStub = () => ({ language: 'en', translate: () => {}, getTranslation: (phrase: string) => phrase });
    TestBed.configureTestingModule({
      imports: [],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PhaseBannerComponent, RpxTranslateMockPipe],
      providers: [
        {
          provide: RpxTranslationService,
          useFactory: rpxTranslationServiceStub,
        },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
      ],
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
    expect(component.bannerPresent).toEqual(false);
    expect(mockSessionStorageService.setItem).toHaveBeenCalled();
  });

  it('should set bannerPresent to true when language is "cy"', () => {
    component.toggleLanguage('cy');
    expect(component.bannerPresent).toBe(true);
  });

  it('should set bannerPresent to false when language is not "cy"', () => {
    component.toggleLanguage('en');
    expect(component.bannerPresent).toBe(false);
  });

  it('should update the language in langService', () => {
    component.toggleLanguage('en');
    expect(component.currentLang).toBe('en');
  });

  it('should create client context if not existing', () => {
    mockSessionStorageService.getItem.and.returnValue(null);
    component.toggleLanguage('en');
    expect(mockSessionStorageService.setItem).toHaveBeenCalledWith(
      'clientContext',
      JSON.stringify({
        client_context: {
          user_language: {
            language: 'en',
          },
        },
      })
    );
  });
});

describe('PhaseBannerComponent additional tests', () => {
  let fixture: ComponentFixture<PhaseBannerComponent>;
  let component: PhaseBannerComponent;
  let mockSessionStorage: any;

  class MockTranslationService {
    private _language: RpxLanguage = 'en';
    public language$ = new BehaviorSubject<RpxLanguage>(this._language);
    public get language(): RpxLanguage {
      return this._language;
    }

    public set language(lang: RpxLanguage) {
      this._language = lang;
      this.language$.next(lang);
    }
  }

  beforeEach(() => {
    mockSessionStorage = {
      getItem: jasmine.createSpy('getItem').and.callFake((key: string) => {
        if (key === 'bannerClosed') {
          return 'false';
        }
        if (key === 'clientContext') {
          return null;
        }
        return null;
      }),
      setItem: jasmine.createSpy('setItem'),
    };

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PhaseBannerComponent, RpxTranslateMockPipe],
      providers: [
        { provide: RpxTranslationService, useClass: MockTranslationService },
        { provide: SessionStorageService, useValue: mockSessionStorage },
      ],
    });

    fixture = TestBed.createComponent(PhaseBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show banner on init when initial language is cy and not previously closed', () => {
    const langService = TestBed.inject(RpxTranslationService);
    langService.language = 'cy';
    component.ngOnInit();
    expect(component.bannerPresent).toBeTrue();
  });

  it('should not show banner on init when banner previously closed in Welsh', () => {
    mockSessionStorage.getItem.and.callFake((key: string) => (key === 'bannerClosed' ? 'true' : null));
    const langService = TestBed.inject(RpxTranslationService);
    langService.language = 'cy';
    component.ngOnInit();
    expect(component.bannerPresent).toBeFalse();
  });

  it('should reset bannerClosed flag to false when language$ emits en', () => {
    const langService = TestBed.inject(RpxTranslationService);
    mockSessionStorage.getItem.and.returnValue('true'); // previously closed
    component.ngOnInit();
    langService.language = 'en'; // trigger subscription
    expect(mockSessionStorage.setItem).toHaveBeenCalledWith('bannerClosed', 'false');
  });

  it('should not keep banner closed after closeBanner if language toggles back to cy via subscription', () => {
    const langService = TestBed.inject(RpxTranslationService);
    component.ngOnInit();
    component.closeBanner();
    expect(component.bannerPresent).toBeFalse();
    langService.language = 'cy';
    expect(component.bannerPresent).toBeTrue();
  });

  it('should update client context on init', () => {
    const langService = TestBed.inject(RpxTranslationService);
    langService.language = 'en';
    component.ngOnInit();
    expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
      'clientContext',
      JSON.stringify({
        client_context: {
          user_language: { language: 'en' },
        },
      })
    );
  });

  it('should preserve existing client context properties when updating language', () => {
    const existingContext = {
      client_context: { existingKey: 'keepMe' },
      topLevelKeep: 'stillHere',
    };
    mockSessionStorage.getItem.and.callFake((key: string) => {
      if (key === 'bannerClosed') {
        return 'false';
      }
      if (key === 'clientContext') {
        return JSON.stringify(existingContext);
      }
      return null;
    });
    component.ngOnInit();
    const langService = TestBed.inject(RpxTranslationService);
    langService.language = 'cy'; // triggers subscription and update
    const expectedContext = {
      client_context: {
        existingKey: 'keepMe',
        user_language: { language: 'cy' },
      },
      topLevelKeep: 'stillHere',
    };
    expect(mockSessionStorage.setItem).toHaveBeenCalledWith('clientContext', JSON.stringify(expectedContext));
  });

  it('should unsubscribe on destroy', () => {
    component.ngOnInit();
    const sub = (component as any).langSub;
    spyOn(sub, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(sub.unsubscribe).toHaveBeenCalled();
  });
});
