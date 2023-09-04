import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class ConvertHrefToRouterService {
    private readonly router;
    private readonly hrefMarkdownLinkContent;
    constructor(router: Router);
    updateHrefLink(content: string): void;
    getHrefMarkdownLinkContent(): Observable<string>;
    callAngularRouter(hrefMarkdownLinkContent: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConvertHrefToRouterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConvertHrefToRouterService>;
}
//# sourceMappingURL=convert-href-to-router.service.d.ts.map