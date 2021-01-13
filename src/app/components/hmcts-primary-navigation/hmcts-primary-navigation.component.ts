import { Component, Input } from '@angular/core';

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
  @Input() public set showNavItems(value) {
        this.showItems = value;
    }

    @Input() public label;
    @Input() public items;
    @Input() public logoIsUsed;
    @Input() public showFindCase: boolean;

    public showItems: boolean;

}
