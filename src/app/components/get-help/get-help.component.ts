import { Component } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { ContactDetailsDataModel } from '@hmcts/rpx-xui-common-lib';

@Component({
    selector: 'exui-get-help',
    templateUrl: './get-help.component.html'
})
export class GetHelpComponent {

    public helpContactDetails: ContactDetailsDataModel[] = AppConstants.HELP_CONTACT_DETAILS;

    constructor() {
    }
}
