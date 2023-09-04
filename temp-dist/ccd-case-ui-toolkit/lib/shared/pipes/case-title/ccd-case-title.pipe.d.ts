import { PipeTransform } from '@angular/core';
import { PlaceholderService } from '../../directives/substitutor/services/placeholder.service';
import { CaseField } from '../../domain/definition/case-field.model';
import { FieldsUtils } from '../../services/fields/fields.utils';
import * as i0 from "@angular/core";
export declare class CcdCaseTitlePipe implements PipeTransform {
    private readonly placeholderService;
    private readonly fieldsUtils;
    constructor(placeholderService: PlaceholderService, fieldsUtils: FieldsUtils);
    transform(caseTitle: string, caseFields: CaseField[], values: any): any;
    private getReadOnlyAndFormFields;
    static ɵfac: i0.ɵɵFactoryDeclaration<CcdCaseTitlePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CcdCaseTitlePipe, "ccdCaseTitle", false>;
}
//# sourceMappingURL=ccd-case-title.pipe.d.ts.map