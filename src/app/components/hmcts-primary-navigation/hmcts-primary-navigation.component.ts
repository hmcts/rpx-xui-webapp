import { Component, Input } from '@angular/core';
import { NavItemsModel } from 'src/app/models/nav-item.model';

@Component({
    selector: 'exui-hmcts-primary-navigation',
    templateUrl: './hmcts-primary-navigation.component.html',
    styleUrls: ['./hmcts-primary-navigation.component.scss']
})
export class HmctsPrimaryNavigationComponent {

    @Input() public set userLoggedIn(value: boolean) {
        this.isUserLoggedIn = true || value;
    }

    @Input() public label: string;
    @Input() public items: NavItemsModel[];

    public isUserLoggedIn = true;
    constructor() {

    }

}
