import {Component, OnInit} from '@angular/core';
import { ContactDetailsDataModel } from '@hmcts/rpx-xui-common-lib';
import {CookieService} from 'ngx-cookie';
import { AppConstants } from 'src/app/app.constants';

@Component({
    selector: 'exui-get-help',
    templateUrl: './get-help.component.html'
})
export class GetHelpComponent implements OnInit {

    public helpContactDetails: ContactDetailsDataModel[] = AppConstants.HELP_CONTACT_DETAILS;
    public caseManager = false;

    constructor(
      private readonly cookieService: CookieService
    ) {}

  public ngOnInit() {
    const userRoles = this.cookieService.get('roles');
    this.caseManager = this.isCaseManager(userRoles);
  }

  /**
   * Is Case Manager
   *
   * Note that I'm not sure why userRoles is prefixed with j. This should
   * be removed by the Node service when supplying userRoles to the UI.
   *
   * But it would require a rework of the header as well.
   *
   * @param userRoles - 'j:["caseworker", "pui-case-manager"]'
   */
  public isCaseManager(userRoles: string): boolean {
    return userRoles && userRoles.indexOf('pui-case-manager') !== -1;
  }
}
