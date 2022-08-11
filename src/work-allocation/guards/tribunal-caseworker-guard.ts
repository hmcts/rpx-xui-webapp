import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserInfo } from '../../app/models/user-details.model';
import { SessionStorageService } from '../../app/services';

@Injectable()
export class TribunalCaseworkerGuard implements CanActivate {
    public static defaultUrl: string = '/cases';
    public static caseWorkerRole: string = 'caseworker-ia-admofficer';
    public static seniorCaseWorkerRole: string = 'caseworker-ia-caseofficer';

    constructor(private readonly router: Router, private readonly sessionStorageService: SessionStorageService) {}

    public canActivate(): boolean {
        let isActivate = false;
        const userInfoStr = this.sessionStorageService.getItem('userDetails');
        if (userInfoStr) {
            const userInfo: UserInfo = JSON.parse(userInfoStr);
            isActivate = userInfo.roles.includes(TribunalCaseworkerGuard.caseWorkerRole) ||
            userInfo.roles.includes(TribunalCaseworkerGuard.seniorCaseWorkerRole);
        }
        if (!isActivate) {
            this.router.navigate([TribunalCaseworkerGuard.defaultUrl]);
        }
        return isActivate;
    }
}
