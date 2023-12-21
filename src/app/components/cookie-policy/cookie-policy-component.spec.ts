import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RpxTranslationService } from 'rpx-xui-translation';
import { CookiePolicyComponent } from './cookie-policy.component';

describe('CookiePolicyComponentTest', () => {
  const translationServiceMock = {
    language: 'cy'
  };

  @Component({ selector: 'exui-app-header', template: '' })
  class HeaderStubComponent {
  }

  @Component({ selector: 'exui-app-footer', template: '' })
  class FooterStubComponent {
  }

  let component: CookiePolicyComponent;
  let fixture: ComponentFixture<CookiePolicyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderStubComponent, FooterStubComponent, CookiePolicyComponent],
      providers: [
        { provide: RpxTranslationService, useValue: translationServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
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
