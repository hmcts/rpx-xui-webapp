import { Component, Input, OnInit } from '@angular/core';
import { RpxLanguage, RpxTranslationService } from 'rpx-xui-translation';

@Component({
  selector: 'exui-phase-banner',
  templateUrl: './phase-banner.component.html'
})
export class PhaseBannerComponent implements OnInit {
  @Input() type: string;
  public noBanner: boolean;

  public get currentLang() {
    return this.langService.language;
  }

  constructor(private readonly langService: RpxTranslationService) { }

  public ngOnInit(): void {
  }

  public toggleLanguage(lang: RpxLanguage): void {
    this.noBanner = (lang === 'cy');
    this.langService.language = lang;
  }

  public closeBanner() {
    this.noBanner = true;
  }

}
