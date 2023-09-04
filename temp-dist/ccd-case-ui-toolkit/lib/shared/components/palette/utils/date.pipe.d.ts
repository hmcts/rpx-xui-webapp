import { PipeTransform } from '@angular/core';
import { FormatTranslatorService } from '../../../services/case-fields/format-translator.service';
import * as i0 from "@angular/core";
export declare class DatePipe implements PipeTransform {
    private readonly formatTrans;
    private static readonly DATE_FORMAT_REGEXP;
    private static readonly MONTHS;
    /**
     * constructor to allow format translator to be injected
     * @param formatTrans format translator
     */
    constructor(formatTrans: FormatTranslatorService);
    transform(value: string, zone?: string, format?: string): string;
    private translateDateFormat;
    private getOffsetDate;
    private getDate;
    private getHour;
    private toInt;
    private pad;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<DatePipe, "ccdDate", false>;
}
//# sourceMappingURL=date.pipe.d.ts.map