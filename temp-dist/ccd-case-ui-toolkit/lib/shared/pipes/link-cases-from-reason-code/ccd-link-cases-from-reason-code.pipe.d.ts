import { PipeTransform } from '@angular/core';
import { LinkFromReason } from '../../components/palette/linked-cases/domain';
import { LinkedCasesService } from '../../components/palette/linked-cases/services';
import * as i0 from "@angular/core";
export declare class LinkCasesFromReasonValuePipe implements PipeTransform {
    private readonly linkedCasesService;
    constructor(linkedCasesService: LinkedCasesService);
    transform(linkFromReason: LinkFromReason): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<LinkCasesFromReasonValuePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<LinkCasesFromReasonValuePipe, "ccdLinkCasesFromReasonValue", false>;
}
//# sourceMappingURL=ccd-link-cases-from-reason-code.pipe.d.ts.map