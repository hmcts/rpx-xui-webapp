import { PipeTransform } from '@angular/core';
import { CaseField } from '../../../domain/definition/case-field.model';
import * as i0 from "@angular/core";
export declare class IsCompoundPipe implements PipeTransform {
    private static readonly COMPOUND_TYPES;
    private static readonly EXCLUDE;
    transform(field: CaseField): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<IsCompoundPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<IsCompoundPipe, "ccdIsCompound", false>;
}
//# sourceMappingURL=is-compound.pipe.d.ts.map