import { Component } from '@angular/core';
import { GetHelpDetailsDataModel } from '../get-help-details/get-help-details.model';
import { AppConstants } from 'src/app/app.constants';

@Component({
    selector: 'exui-get-help',
    templateUrl: './get-help.component.html'
})
export class GetHelpComponent {

    public getHelpData: GetHelpDetailsDataModel[] = AppConstants.GET_HELP_DETAILS_DATA;

    constructor() {
    }
}
