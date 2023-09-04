import { AbstractAppConfig } from '../../../app.config';
import * as i0 from "@angular/core";
/**
 * `Oauth2Service` and `AuthService` cannot be merged as it creates a cyclic dependency on `AuthService` through `HttpErrorService`.
 */
export declare class AuthService {
    private readonly appConfig;
    private readonly document;
    private static readonly PATH_OAUTH2_REDIRECT;
    constructor(appConfig: AbstractAppConfig, document: any);
    signIn(): void;
    redirectUri(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthService>;
}
//# sourceMappingURL=auth.service.d.ts.map