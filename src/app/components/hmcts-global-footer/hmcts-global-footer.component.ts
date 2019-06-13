import {Component, Input, OnInit} from '@angular/core';
import {Helper, Navigation} from '../../containers/footer/footer.model';

@Component({
    selector: 'exui-app-hmcts-global-footer',
    templateUrl: './hmcts-global-footer.component.html'
})
export class HmctsGlobalFooterComponent implements OnInit {
    @Input() help: Helper;
    @Input() navigation: Navigation;

    constructor() { }
    ngOnInit() {}

}
