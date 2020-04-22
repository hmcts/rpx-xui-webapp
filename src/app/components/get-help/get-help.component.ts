import {Component, OnInit} from '@angular/core';
import { AppConstants } from 'src/app/app.constants';
import { ContactDetailsDataModel } from '@hmcts/rpx-xui-common-lib';
import {CookieService} from 'ngx-cookie';

@Component({
    selector: 'exui-get-help',
    templateUrl: './get-help.component.html'
})
export class GetHelpComponent implements OnInit {

    public helpContactDetails: ContactDetailsDataModel[] = AppConstants.HELP_CONTACT_DETAILS;
    public isCaseManager = false;

    constructor(
      private cookieService: CookieService
    ) {}

  public ngOnInit() {
    const userRoles = this.cookieService.get('roles');
    this.isCaseManager = this.getIsCaseManager(userRoles);
  }

  public getIsCaseManager(userRoles: string): boolean {
    return userRoles && userRoles.indexOf('pui-case-manager') !== -1;
  }
}
