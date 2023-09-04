import { PipeTransform } from '@angular/core';
import { CaseField } from '../../../domain/definition';
import { CaseFieldService } from '../../../services/case-fields';
import * as i0 from "@angular/core";
export declare class IsReadOnlyAndNotCollectionPipe implements PipeTransform {
    private readonly caseFieldService;
    constructor(caseFieldService: CaseFieldService);
    transform(field: CaseField): boolean;
    private isCollection;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsReadOnlyAndNotCollectionPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsReadOnlyAndNotCollectionPipe, "ccdIsReadOnlyAndNotCollection", false>;
}
//# sourceMappingURL=is-read-only-and-not-collection.pipe.d.ts.map