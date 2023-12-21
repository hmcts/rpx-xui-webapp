import { Component, Input } from '@angular/core';
import { RpxLanguage, RpxTranslationService } from 'rpx-xui-translation';
import { SessionStorageService } from 'src/app/services';

@Component({
  selector: 'exui-phase-banner',
  templateUrl: './phase-banner.component.html'
})
export class PhaseBannerComponent {
  @Input() public type: string;
  public noBanner: boolean;
  private readonly noBannerSessionKey = 'noBanner';

  public get currentLang() {
    return this.langService.language;
  }

  constructor(private readonly langService: RpxTranslationService,
              private readonly sessionStorageService: SessionStorageService) { }

  public ngOnInit(): void {
    this.noBanner = (this.currentLang === 'cy' ? true : false);
    if (!this.noBanner) {
      this.noBanner = JSON.parse(this.sessionStorageService.getItem(this.noBannerSessionKey));
    }
  }

  public toggleLanguage(lang: RpxLanguage): void {
    this.noBanner = (lang === 'cy');
    this.langService.language = lang;
  }

  public closeBanner() {
    this.noBanner = false;
    this.sessionStorageService.setItem(this.noBannerSessionKey, 'false');
  }
}
