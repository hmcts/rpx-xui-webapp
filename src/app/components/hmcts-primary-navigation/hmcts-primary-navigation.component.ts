import { Component, Input } from '@angular/core';

@Component({
    selector: 'exui-hmcts-primary-navigation',
    templateUrl: './hmcts-primary-navigation.component.html',
    styleUrls: ['./hmcts-primary-navigation.component.scss']
})
export class HmctsPrimaryNavigationComponent {

    @Input() public set userLoggedIn(value: boolean) {
        this.isUserLoggedIn = true;
    }

    @Input() public label: any;
    @Input() public items: any;

    public isUserLoggedIn = true;
    constructor() {

    }

}
