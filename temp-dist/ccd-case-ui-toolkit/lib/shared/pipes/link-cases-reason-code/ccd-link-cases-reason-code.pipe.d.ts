import { PipeTransform } from '@angular/core';
import { LinkReason } from '../../components';
import { LinkedCasesService } from '../../components/palette/linked-cases/services';
import * as i0 from "@angular/core";
export declare class LinkCasesReasonValuePipe implements PipeTransform {
    private readonly linkedCasesService;
    constructor(linkedCasesService: LinkedCasesService);
    transform(linkReason: LinkReason): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<LinkCasesReasonValuePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<LinkCasesReasonValuePipe, "ccdLinkCasesReasonValue", false>;
}
//# sourceMappingURL=ccd-link-cases-reason-code.pipe.d.ts.map