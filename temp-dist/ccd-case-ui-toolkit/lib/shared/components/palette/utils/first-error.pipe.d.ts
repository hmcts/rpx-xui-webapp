import { PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { RpxTranslatePipe } from 'rpx-xui-translation';
import * as i0 from "@angular/core";
export declare class FirstErrorPipe implements PipeTransform {
    private readonly rpxTranslationPipe;
    constructor(rpxTranslationPipe: RpxTranslatePipe);
    transform(value: ValidationErrors, args?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<FirstErrorPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FirstErrorPipe, "ccdFirstError", false>;
}
//# sourceMappingURL=first-error.pipe.d.ts.map