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
   */
  @Input() set showNavItems(value) {
        this.showItems = value;
    }

    @Input() label;
    @Input() items;
    @Input() public logoIsUsed;
    @Input() showFindCase: boolean;

    public showItems: boolean;
    constructor(private route: ActivatedRoute) {

    }

}
