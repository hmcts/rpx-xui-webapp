import { PipeTransform } from '@angular/core';
import { AbstractAppConfig } from '../../../../../app.config';
import * as i0 from "@angular/core";
export declare class PrintUrlPipe implements PipeTransform {
    private readonly appConfig;
    private static readonly MSIE_BROWSER_NAME;
    private static readonly IE11_BROWSER_ENGINE;
    constructor(appConfig: AbstractAppConfig);
    /**
     * Takes a "remote" Print Service URL (for example, as returned by calling the `/documents` CCD endpoint) and
     * rewrites it into a "local", application-specific URL for the front-end. The resulting URL is of the form:
     *
     * Configurable "Local URL" (e.g. `/print`) + _pathname_ from original "remote URL"
     * (e.g. `/jurisdictions/TEST/case-types/Test1/cases/1111222233334444`)
     *
     * @param remoteUrl The "remote" URL to rewrite
     * @returns A rewritten URL as per the above description, or the original `remoteUrl` if it is `null`, `undefined`,
     * or the empty string
     */
    transform(remoteUrl: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PrintUrlPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<PrintUrlPipe, "ccdPrintUrl", false>;
}
//# sourceMappingURL=print-url.pipe.d.ts.map