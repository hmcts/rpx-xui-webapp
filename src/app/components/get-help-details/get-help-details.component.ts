import { Component, Input } from '@angular/core';
import { GetHelpDetailsDataModel } from './get-help-details.model';

@Component({
    selector: 'exui-get-help-details',
    templateUrl: './get-help-details.component.html',
    styleUrls: ['get-help-details.component.scss']
})
export class GetHelpDetailsComponent {

    @Input() data: GetHelpDetailsDataModel;

    constructor() {
    }
}
