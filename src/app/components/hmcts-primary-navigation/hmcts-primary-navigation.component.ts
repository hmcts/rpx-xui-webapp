import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'exui-hmcts-primary-navigation',
    templateUrl: './hmcts-primary-navigation.component.html',
    styleUrls: ['./hmcts-primary-navigation.component.scss']
})
export class HmctsPrimaryNavigationComponent {

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
