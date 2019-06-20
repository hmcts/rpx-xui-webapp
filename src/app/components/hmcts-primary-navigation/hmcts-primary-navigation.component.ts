import { Component, Input } from '@angular/core'
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

    @Input()
    label = 'Primary navigation'
    @Input()
    items = [
        {
            text: 'Nav item 1',
            href: '#1',
            active: true
        },
        {
            text: 'Nav item 2',
            href: '#2'
        },
        {
            text: 'Nav item 3',
            href: '#3'
        }
    ]

    isUserLoggedIn = true;
    constructor(private route: ActivatedRoute) {

    }

}
