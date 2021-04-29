import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserInfo } from '../../app/models/user-details.model';
import { SessionStorageService } from '../../app/services';

@Injectable()
export class SeniorTribunalCaseworkerGuard implements CanActivate {
    public static defaultUrl: string = '/cases';
    public static seniorCaseWorkerRole: string = 'caseworker-ia-srcaseofficer';

    constructor(private readonly router: Router, private readonly sessionStorageService: SessionStorageService) {}

    public canActivate(): boolean {
        let isActivate = false;
        const userInfoStr = this.sessionStorageService.getItem('userDetails');
        if (userInfoStr) {
            const userInfo: UserInfo = JSON.parse(userInfoStr);
            isActivate = userInfo.roles.includes(SeniorTribunalCaseworkerGuard.seniorCaseWorkerRole);
        }
        if (!isActivate) {
            this.router.navigate([SeniorTribunalCaseworkerGuard.defaultUrl]);
        }
        return isActivate;
    }
}
