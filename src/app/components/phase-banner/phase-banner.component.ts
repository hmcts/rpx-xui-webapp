import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RpxLanguage, RpxTranslationService } from 'rpx-xui-translation';
import { Subscription } from 'rxjs';
import { SessionStorageService } from '../../../app/services';
import { safeJsonParseFallback } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  standalone: false,
  selector: 'exui-phase-banner',
  templateUrl: './phase-banner.component.html',
})
export class PhaseBannerComponent implements OnInit, OnDestroy {
  @Input() public type: string;
  public bannerPresent: boolean;
  private readonly bannerClosedSessionKey = 'bannerClosed';
  private langSub: Subscription;

  public get currentLang() {
    return this.langService.language;
  }

  constructor(
    private readonly langService: RpxTranslationService,
    private readonly sessionStorageService: SessionStorageService
  ) {}

  public ngOnInit(): void {
    this.applyLanguageChanges(this.currentLang);
    if (this.langService.language$) {
      // if observable exists, subscribe to changes to encompass footer (or other instigated) change
      this.langSub = this.langService.language$.subscribe((currentLanguage: RpxLanguage) => {
        if (currentLanguage === 'en') {
          this.sessionStorageService.setItem(this.bannerClosedSessionKey, 'false');
        }
        this.applyLanguageChanges(currentLanguage);
      });
    }
  }

  public ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  public toggleLanguage(lang: RpxLanguage): void {
    this.bannerPresent = lang === 'cy';
    this.langService.language = lang;
    // client context will change language through subscription
  }

  public closeBanner() {
    this.bannerPresent = false;
    this.sessionStorageService.setItem(this.bannerClosedSessionKey, 'true');
  }

  private applyLanguageChanges(language: RpxLanguage): void {
    const bannerPreviouslyClosed = this.sessionStorageService.getItem(this.bannerClosedSessionKey) === 'true';
    // Show banner when Welsh and not previously closed
    this.bannerPresent = language === 'cy' && !bannerPreviouslyClosed;
    // This allows us to set the client context language when initialising and when header or footer changes the language
    this.updateClientContextLanguage(language);
  }

  private updateClientContextLanguage(language: RpxLanguage): void {
    const clientContextObj = safeJsonParseFallback<any>(this.sessionStorageService.getItem('clientContext'), {}) || {};
    const clientContextAddLanguage = {
      ...clientContextObj,
      client_context: {
        ...clientContextObj.client_context,
        user_language: {
          language: language,
        },
      },
    };
    this.sessionStorageService.setItem('clientContext', JSON.stringify(clientContextAddLanguage));
  }
}
