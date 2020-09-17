import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'exui-hmcts-primary-navigation',
    templateUrl: './hmcts-primary-navigation.component.html',
    styleUrls: ['./hmcts-primary-navigation.component.scss']
})
export class HmctsPrimaryNavigationComponent {

  /**
   * That showNavItems is used specifically on the Terms and Conditions page, to not show
   * the Navigation Menu
   *
   * @param value
   */
  @Input() set showNavItems(value) {
        this.showItems = value;
    }

    @Input() label;
    @Input() items;
    @Input() logoIsUsed;
    // TODO: Remove
    @Input() isBrandedHeader: boolean;
    @Input() showFindCase: boolean;

    showItems: boolean;
    constructor(private route: ActivatedRoute) {

    }

}
