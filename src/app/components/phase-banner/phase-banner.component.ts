import { Component, Input } from '@angular/core';
import { RpxLanguage, RpxTranslationService } from 'rpx-xui-translation';
import { SessionStorageService } from 'src/app/services';
import * as fromOrgStore from '../../../organisation/store';
import { Store, select } from '@ngrx/store';
import { Organisation } from 'src/organisation/models';
import { AppConstants } from 'src/app/app.constants';
import { filter } from 'rxjs';

@Component({
  selector: 'exui-phase-banner',
  templateUrl: './phase-banner.component.html'
})
export class PhaseBannerComponent {
  @Input() public type: string;
  public noBanner: boolean;
  public displayWelshToggle: boolean = false;
  private readonly noBannerSessionKey = 'noBanner';

  public get currentLang() {
    return this.langService.language;
  }

  constructor(private readonly langService: RpxTranslationService,
              private readonly sessionStorageService: SessionStorageService,
              private readonly orgStore: Store<fromOrgStore.OrganisationState>,) { }

  public ngOnInit(): void {
    this.noBanner = (this.currentLang === 'cy' ? true : false);
    if (!this.noBanner) {
      this.noBanner = JSON.parse(this.sessionStorageService.getItem(this.noBannerSessionKey));
    }
    this.loadAndSubscribeToOrganisation();
  }

  public toggleLanguage(lang: RpxLanguage): void {
    this.noBanner = (lang === 'cy');
    this.langService.language = lang;
  }

  public closeBanner() {
    this.noBanner = false;
    this.sessionStorageService.setItem(this.noBannerSessionKey, 'false');
  }

  public loadAndSubscribeToOrganisation(): void {
    this.orgStore.dispatch(new fromOrgStore.LoadOrganisation());
    this.orgStore.pipe(
      select(fromOrgStore.getOrganisationSel),
      filter((response) => response !== null) // Skip null or undefined values
    ).subscribe((response: Organisation) => {
      this.displayWelshToggle = response.organisationProfileIds?.includes(AppConstants.OGD_PROFILE_TYPES.SOLICITOR_PROFILE);
    });
  }
}
