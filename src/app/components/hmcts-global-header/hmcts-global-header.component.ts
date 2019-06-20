import {Component, Input, OnInit} from '@angular/core';
import * as fromRoot from '../../store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'exui-hmcts-global-header',
    templateUrl: './hmcts-global-header.component.html'
})
export class HmctsGlobalHeaderComponent {

    // @Input() set userLoggedIn(value) {
    //     this.userValue = value;
    // }
    @Input() headerTitle: {name: string; url: string};
    @Input() navigation;

    userValue: true;
    constructor(public store: Store<fromRoot.State>) { }

}
