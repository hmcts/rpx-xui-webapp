import { Component, Input } from '@angular/core';
import { RpxLanguage, RpxTranslationService } from 'rpx-xui-translation';
import { Subscription } from 'rxjs';
import { SessionStorageService } from '../../../app/services';

@Component({
  selector: 'exui-phase-banner',
  templateUrl: './phase-banner.component.html'
})
export class PhaseBannerComponent {
  @Input() public type: string;
  public bannerPresent: boolean;
  private readonly bannerPresentSessionKey = 'bannerPresent';
  private langSub: Subscription;

  public get currentLang() {
    return this.langService.language;
  }

  constructor(private readonly langService: RpxTranslationService,
              private readonly sessionStorageService: SessionStorageService) { }

  public ngOnInit(): void {
    this.applyBanner(this.currentLang);
    if (this.langService.language$) {
      // if observable exists, subscribe to changes to encompass footer (or other instigated) change
      this.langSub = this.langService.language$.subscribe((currentLanguage: RpxLanguage) => {
        this.applyBanner(currentLanguage);
      });
    }
  }

  public ngOnDestroy(): void {
    this.langSub?.unsubscribe();
  }

  public toggleLanguage(lang: RpxLanguage): void {
    this.bannerPresent = (lang === 'cy');
    this.langService.language = lang;
    const clientContextObj = JSON.parse(this.sessionStorageService.getItem('clientContext')) || {};
    const clientContextAddLanguage = {
      ...clientContextObj,
      client_context: {
        ...clientContextObj.client_context,
        user_language: {
          language: lang
        }
      }
    };
    this.sessionStorageService.setItem('clientContext', JSON.stringify(clientContextAddLanguage));
  }

  public closeBanner() {
    this.bannerPresent = false;
    this.sessionStorageService.setItem(this.bannerPresentSessionKey, 'false');
  }

  private applyBanner(language: RpxLanguage): void {
    // Show banner when Welsh OR stored flag says false after closure
    this.bannerPresent = (language === 'cy' ? true : false);
    if (!this.bannerPresent) {
      this.bannerPresent = JSON.parse(this.sessionStorageService.getItem(this.bannerPresentSessionKey));
    }
  }
}
