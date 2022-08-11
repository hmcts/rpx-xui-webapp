import { Router } from '@angular/router';
import { SeniorTribunalCaseworkerGuard } from './senior-tribunal-caseworker-guard';
import { UserInfo } from '../../app/models/user-details.model';

describe('SeniorTribunalCaseworkerGuard', () => {
    let guard: SeniorTribunalCaseworkerGuard;
    let routerMock: jasmine.SpyObj<Router>;
    let sessionStorageService: any;
    beforeEach(() => {
        routerMock = jasmine.createSpyObj<Router>('router', ['navigate']);
        sessionStorageService = jasmine.createSpyObj('sessionStorageService', ['getItem']);
        guard = new SeniorTribunalCaseworkerGuard(routerMock, sessionStorageService);
    });

    it('guard truthy', () => {
        expect(guard).toBeTruthy();
    });

    it('canActivate false', () => {
        const result = guard.canActivate();
        expect(result).toBeFalsy();
        expect(routerMock.navigate).toHaveBeenCalledWith([SeniorTribunalCaseworkerGuard.defaultUrl]);
    });

    it('canActivate true', () => {
        const userDetails: UserInfo = {
            id: '1',
            forename: 'forename',
            surname: 'surname',
            email: 'email@email.com',
            active: true,
            roles: [SeniorTribunalCaseworkerGuard.seniorCaseWorkerRole],
            uid: '1133-3435-34545-3435'
        };
        sessionStorageService.getItem.and.returnValue(JSON.stringify(userDetails));
        const result = guard.canActivate();
        expect(result).toBeTruthy();
        expect(routerMock.navigate).not.toHaveBeenCalled();
    });
});
