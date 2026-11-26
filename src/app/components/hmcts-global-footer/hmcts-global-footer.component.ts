import { Component, Input } from '@angular/core';
import { AppConstants } from '../../app.constants';
import { Helper, Navigation } from '../../containers/footer/footer.model';
import { RpxLanguage, RpxTranslationService } from 'rpx-xui-translation';

@Component({
  standalone: false,
  selector: 'exui-app-hmcts-global-footer',
  templateUrl: './hmcts-global-footer.component.html',
  styleUrls: ['./hmcts-global-footer.component.scss'],
})
export class HmctsGlobalFooterComponent {
  public readonly newTabWarningText = AppConstants.NEW_TAB_WARNING_TEXT;
  @Input() public help: Helper;
  @Input() public navigation: Navigation;
  @Input() public userEmail: string;

  public get currentLang() {
    return this.langService.language;
  }

  constructor(private readonly langService: RpxTranslationService) {}

  public toggleLanguage(lang: RpxLanguage): void {
    this.langService.language = lang;
  }
}
