import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RpxTranslationService } from 'rpx-xui-translation';
import { CookiePolicyComponent } from './cookie-policy.component';

describe('CookiePolicyComponentTest', () => {
  const translationServiceMock = {
    language: 'cy',
  };

  @Component({
    standalone: false,
    selector: 'exui-app-header',
    template: '',
  })
  class HeaderStubComponent {}

  @Component({
    standalone: false,
    selector: 'exui-app-footer',
    template: '',
  })
  class FooterStubComponent {}

  let component: CookiePolicyComponent;
  let fixture: ComponentFixture<CookiePolicyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderStubComponent, FooterStubComponent, CookiePolicyComponent],
      providers: [{ provide: RpxTranslationService, useValue: translationServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    translationServiceMock.language = 'cy';
    fixture = TestBed.createComponent(CookiePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be created by angular', () => {
    expect(fixture).not.toBeNull();
  });

  it('should include a new-tab warning in every link that opens a new tab', () => {
    const expectNewTabWarnings = () => {
      const links = fixture.nativeElement.querySelectorAll('a[target="_blank"]') as NodeListOf<HTMLAnchorElement>;
      const expectedWarning = component.showWelshTranslation ? component.newTabWarningTextWelsh : component.newTabWarningText;
      expect(links.length).toBeGreaterThan(0);
      links.forEach((link) => expect(link.textContent).toContain(expectedWarning));
    };

    expectNewTabWarnings();

    translationServiceMock.language = 'en';
    fixture.detectChanges();
    expectNewTabWarnings();
  });

  it('should include 4 security cookies', () => {
    expect(component.countCookies(component.SECURITY)).toBe(4);
  });
  it('should return the __id defnyddiwr__ cookie as an identity cookie', () => {
    const cookieName = component.cookiesByCat(component.IDENTIFY)[0].name;
    expect(cookieName).toBe('__id defnyddiwr__');
  });
  it('cookiesByCat should be consistent with countCookies', () => {
    const cookies = component.cookiesByCat(component.SECURITY);
    let cc = 0;
    for (const ccc of cookies) {
      expect(ccc.cat).toBe(component.SECURITY);
      cc = cc + 1;
    }
    expect(cc).toEqual(component.countCookies(component.SECURITY));
  });

  describe('showWelshTranslation', () => {
    it('should be true', async () => {
      expect(component.showWelshTranslation).toEqual(true);
    });

    it('should be false', async () => {
      translationServiceMock.language = 'en';
      expect(component.showWelshTranslation).toEqual(false);
    });
  });
});
