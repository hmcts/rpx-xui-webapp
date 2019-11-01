import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'exui-hmcts-primary-navigation',
    templateUrl: './hmcts-primary-navigation.component.html',
    styleUrls: ['./hmcts-primary-navigation.component.scss']
})
export class HmctsPrimaryNavigationComponent {

    @Input() set userLoggedIn(value) {
        this.isUserLoggedIn = true;
    }

    @Input() label;
    @Input() items;
    @Input() isBrandedHeader: boolean;

    isUserLoggedIn = true;
    constructor(private route: ActivatedRoute) {

    }

}
