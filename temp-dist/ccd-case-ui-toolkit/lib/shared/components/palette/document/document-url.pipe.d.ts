import { PipeTransform } from '@angular/core';
import { AbstractAppConfig } from '../../../../app.config';
import * as i0 from "@angular/core";
export declare class DocumentUrlPipe implements PipeTransform {
    private readonly appConfig;
    constructor(appConfig: AbstractAppConfig);
    transform(value: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DocumentUrlPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DocumentUrlPipe, "ccdDocumentUrl", false>;
}
//# sourceMappingURL=document-url.pipe.d.ts.map