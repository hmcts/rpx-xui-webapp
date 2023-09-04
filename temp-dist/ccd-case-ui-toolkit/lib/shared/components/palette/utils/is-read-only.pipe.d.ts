import { PipeTransform } from '@angular/core';
import { CaseField } from '../../../domain/definition/case-field.model';
import { CaseFieldService } from '../../../services/case-fields/case-field.service';
import * as i0 from "@angular/core";
export declare class IsReadOnlyPipe implements PipeTransform {
    private readonly caseFieldService;
    constructor(caseFieldService: CaseFieldService);
    transform(field: CaseField): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsReadOnlyPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsReadOnlyPipe, "ccdIsReadOnly", false>;
}
//# sourceMappingURL=is-read-only.pipe.d.ts.map