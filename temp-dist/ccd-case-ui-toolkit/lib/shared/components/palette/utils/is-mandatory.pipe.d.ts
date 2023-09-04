import { PipeTransform } from '@angular/core';
import { CaseField } from '../../../domain/definition/case-field.model';
import { CaseFieldService } from '../../../services/case-fields/case-field.service';
import * as i0 from "@angular/core";
export declare class IsMandatoryPipe implements PipeTransform {
    private readonly caseFieldService;
    constructor(caseFieldService: CaseFieldService);
    transform(field: CaseField): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsMandatoryPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsMandatoryPipe, "ccdIsMandatory", false>;
}
//# sourceMappingURL=is-mandatory.pipe.d.ts.map