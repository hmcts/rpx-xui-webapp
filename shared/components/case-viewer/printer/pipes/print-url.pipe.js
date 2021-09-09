"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_config_1 = require("../../../../../app.config");
var PrintUrlPipe = /** @class */ (function () {
    function PrintUrlPipe(appConfig) {
        this.appConfig = appConfig;
    }
    PrintUrlPipe_1 = PrintUrlPipe;
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
    PrintUrlPipe.prototype.transform = function (remoteUrl) {
        if (remoteUrl && remoteUrl.length > 0) {
            var printServiceUrlPathname = void 0;
            /**
             * Check navigator.userAgent to see if the browser is IE or not. Check for either the browser name, "MSIE", or
             * the rendering engine, "Trident" (used to identify IE 11 because it no longer reports as "MSIE").
             * Note: IE does not support the URL interface and requires a workaround to parse URLs.
             */
            if (navigator.userAgent.indexOf(PrintUrlPipe_1.MSIE_BROWSER_NAME) !== -1 ||
                navigator.userAgent.indexOf(PrintUrlPipe_1.IE11_BROWSER_ENGINE) !== -1) {
                // Workaround for not being able to use the URL interface
                var urlParser = document.createElement('a');
                urlParser.href = remoteUrl;
                // Get the pathname from the anchor element with the "remote" Print Service URL
                printServiceUrlPathname = urlParser.pathname;
                if (printServiceUrlPathname[0] !== '/') {
                    // Fix for IE11; it returns the pathname without leading slash
                    printServiceUrlPathname = '/' + printServiceUrlPathname;
                }
            }
            else {
                // Get the pathname parsed from the "remote" Print Service URL object
                printServiceUrlPathname = new URL(remoteUrl).pathname;
            }
            // Return an amended URL comprising the "local" Print Service URL (usually /print) and the "remote" pathname
            return this.appConfig.getPrintServiceUrl() + printServiceUrlPathname;
        }
        return remoteUrl;
    };
    var PrintUrlPipe_1;
    PrintUrlPipe.MSIE_BROWSER_NAME = 'MSIE';
    PrintUrlPipe.IE11_BROWSER_ENGINE = 'Trident';
    PrintUrlPipe = PrintUrlPipe_1 = __decorate([
        core_1.Pipe({
            name: 'ccdPrintUrl'
        }),
        __metadata("design:paramtypes", [app_config_1.AbstractAppConfig])
    ], PrintUrlPipe);
    return PrintUrlPipe;
}());
exports.PrintUrlPipe = PrintUrlPipe;
//# sourceMappingURL=print-url.pipe.js.map