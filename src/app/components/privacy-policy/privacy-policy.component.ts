import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RpxTranslationService } from 'rpx-xui-translation';

@Component({
  selector: 'exui-privacy-policy',
  templateUrl: './privacy-policy.component.html'
})
export class PrivacyPolicyComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute, private readonly langService: RpxTranslationService) {}

  public get showWelshTranslation(): boolean {
    return this.langService.language === 'cy';
  }

  public ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      try {
        document.querySelector(`#${fragment}`).scrollIntoView();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    });
  }
}
