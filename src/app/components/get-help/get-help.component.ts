import { Component } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { ContactDetailsDataModel } from '@hmcts/rpx-xui-common-lib';

@Component({
    selector: 'exui-get-help',
    templateUrl: './get-help.component.html'
})
export class GetHelpComponent {

    public getHelpData: ContactDetailsDataModel[] = AppConstants.GET_HELP_DETAILS_DATA;

    constructor() {
    }
}
