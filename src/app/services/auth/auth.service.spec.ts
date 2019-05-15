import { inject, TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { ConfigService } from '../config.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

const config = {
    config: {
        cookies: {
            token: 'bob',
            userId: 'ben'
        },
        services: {
            idam_web: 'http://idam_url.com'
        },
        oauth_callback_url: 'callback_url',
        api_base_url: 'api_base',
        idam_client: 'client_name'
    }
};

const router = {
    navigate: () => { }
};

const cookieService = {
    get: key => {
        return this[key];
    },
    set: (key, value) => {
        this[key] = value;
    },
    removeAll: () => { }
};

let deleteCookiesSpy;
let routerNavigateSpy;

describe('AuthService', () => {
    beforeEach(() => {
        deleteCookiesSpy = spyOn(cookieService, 'removeAll');
        routerNavigateSpy = spyOn(router, 'navigate');
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: ConfigService, useValue: config },
                { provide: Router, useValue: router },
                { provide: CookieService, useValue: cookieService }
            ]
        });
    });

    it('should be created', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));

    it('should take cookie ids from config', inject([AuthService], (service: AuthService) => {
        expect(service.COOKIE_KEYS).toEqual({
            TOKEN: config.config.cookies.token,
            USER: config.config.cookies.userId
        });
    }));

    it('should generate a login url', inject([AuthService], (service: AuthService) => {
        const url = service.generateLoginUrl();
        expect(url).toEqual('http://idam_url.com/login?response_type=code&client_id=client_name&redirect_uri=api_base/callback_url');
    }));

    it('Should provide header versions of cookie values', inject([AuthService], (service: AuthService) => {
        cookieService.set(service.COOKIE_KEYS.TOKEN, 'value1');
        cookieService.set(service.COOKIE_KEYS.USER, 'value2');
        const headers = service.getAuthHeaders();
        expect(headers).toEqual({ Authorization: 'value1', ben: 'value2' });
    }));

    describe('isAuthenticated', () => {
        it('should return false when jwt is expired, true when still valid', inject([AuthService], (service: AuthService) => {
            let expiry = new Date().getTime() + 3000;
            service.decodeJwt = () => {
                return {
                    exp: expiry
                };
            };
            expect(service.isAuthenticated()).toEqual(false);
            expiry = new Date().getTime() - 3000;
            expect(service.isAuthenticated()).toEqual(true);
        }));

    });


    describe('User Roles', () => {
        it('it should return user roles', inject([AuthService], (service: AuthService) => {
            service.decodeJwt = () => {
                return {
                    roles: []
                };
            };
            const userRoles = service.getLoggedInUserRoles();
            expect(userRoles.length).toBe(0);
        }));

    });
});
