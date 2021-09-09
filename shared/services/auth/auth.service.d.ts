import { AbstractAppConfig } from '../../../app.config';
/**
 * `Oauth2Service` and `AuthService` cannot be merged as it creates a cyclic dependency on `AuthService` through `HttpErrorService`.
 */
export declare class AuthService {
    private appConfig;
    private document;
    private static readonly PATH_OAUTH2_REDIRECT;
    constructor(appConfig: AbstractAppConfig, document: any);
    signIn(): void;
    redirectUri(): string;
}
